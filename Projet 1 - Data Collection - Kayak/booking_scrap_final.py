"""
Scrapy spider — extrait les hôtels Booking.com pour une liste de villes.

Usage:
    python booking_scrap_final.py --cities Paris Marseille Lyon

Sortie: hotels.json (écrasé à chaque run)
"""

from __future__ import annotations

import argparse
import os
import re

import scrapy
from scrapy.crawler import CrawlerProcess


class BookingSpiderPage(scrapy.Spider):
    name = "booking"
    allowed_domains = ["booking.com"]

    custom_settings = {
        "USER_AGENT": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        ),
        "ROBOTSTXT_OBEY": False,
        "DOWNLOAD_DELAY": 1.0,
        "AUTOTHROTTLE_ENABLED": True,
        "AUTOTHROTTLE_START_DELAY": 1.0,
        "AUTOTHROTTLE_MAX_DELAY": 5.0,
        "HTTPCACHE_ENABLED": True,
        "LOG_LEVEL": "INFO",
        "DEFAULT_REQUEST_HEADERS": {
            "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    }

    def __init__(self, cities=None, max_hotels: int = 20, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cities = cities or []
        self.max_hotels = max_hotels

    def start_requests(self):
        """Génère les requêtes initiales pour chaque ville."""
        for city in self.cities:
            url = f"https://www.booking.com/searchresults.html?ss={city}"
            yield scrapy.Request(
                url=url,
                callback=self.parse,
                meta={"city": city},
                errback=self.errback_log,
            )

    def errback_log(self, failure):
        self.logger.error("Request failed: %s", failure.request.url)

    def parse(self, response):
        """Parse la page de résultats (cartes propriété)."""
        city = response.meta["city"]
        hotels = response.xpath("//div[@data-testid='property-card']")[: self.max_hotels]

        if not hotels:
            self.logger.warning("Aucun hôtel trouvé pour %s (DOM Booking peut avoir changé)", city)

        for hotel in hotels:
            hotel_data = self.extract_hotel_info(hotel)
            if not hotel_data.get("url"):
                continue
            full_url = response.urljoin(hotel_data["url"])
            yield scrapy.Request(
                url=full_url,
                callback=self.parse_hotel,
                meta={**hotel_data, "city": city},
                errback=self.errback_log,
            )

    def extract_hotel_info(self, hotel):
        """Extrait les infos de base d'une carte hôtel."""
        return {
            "name": hotel.xpath(".//div[@data-testid='title']/text()").get(),
            "url": hotel.xpath(".//a[@data-testid='title-link']/@href | .//a/@href").get(),
            "score": self.parse_score(hotel),
            "description": hotel.xpath(
                ".//div[@data-testid='property-card-desktop-content']"
                "//div[contains(@class,'abf093bdfe')]/text() | "
                "div[1]/div[2]/div/div/div[1]/div/div[3]/text()"
            ).get(),
        }

    def parse_score(self, hotel):
        """Extrait et convertit le score en float (None si absent)."""
        # Plusieurs variantes de DOM possibles selon la locale / A/B test
        raw = (
            hotel.xpath(".//div[@data-testid='review-score']//div[contains(@aria-hidden,'true')]/text()").get()
            or hotel.xpath(".//div[@data-testid='review-score']/div[1]/text()").get()
            or hotel.xpath(".//div[@data-testid='review-score']/div[2]/text()").get()
        )
        if not raw:
            return None
        try:
            return float(raw.replace(",", ".").strip())
        except ValueError:
            return None

    def parse_hotel(self, response):
        """Parse la page détail pour extraire lat/lon."""
        script_content = response.xpath(
            "//script[contains(text(), 'b_map_center_latitude')]/text()"
        ).get()
        latitude, longitude = self.extract_lat_lon_from_script(script_content)

        yield {
            "name": response.meta.get("name"),
            "url": response.meta.get("url"),
            "score": response.meta.get("score"),
            "description": response.meta.get("description"),
            "city": response.meta.get("city"),
            "latitude": latitude,
            "longitude": longitude,
        }

    @staticmethod
    def extract_lat_lon_from_script(script_content):
        """Regex lat/lon depuis le script Booking."""
        if not script_content:
            return None, None
        lat_match = re.search(r"b_map_center_latitude\s*=\s*([-\d.]+);", script_content)
        lon_match = re.search(r"b_map_center_longitude\s*=\s*([-\d.]+);", script_content)
        latitude = lat_match.group(1) if lat_match else None
        longitude = lon_match.group(1) if lon_match else None
        return latitude, longitude


def setup_crawler(cities, max_hotels: int = 20, output: str = "hotels.json"):
    process = CrawlerProcess(
        settings={
            "FEEDS": {output: {"format": "json", "encoding": "utf8", "overwrite": True}},
            "LOG_LEVEL": "INFO",
        }
    )
    process.crawl(BookingSpiderPage, cities=cities, max_hotels=max_hotels)
    process.start()


def remove_old_file(filename: str) -> None:
    if os.path.exists(filename):
        os.remove(filename)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scrape Booking.com hotels for given cities.")
    parser.add_argument("--cities", nargs="+", required=True, help="Villes à scraper")
    parser.add_argument("--max-hotels", type=int, default=20, help="Max hôtels par ville (défaut: 20)")
    parser.add_argument("--output", default="hotels.json", help="Fichier JSON de sortie")
    args = parser.parse_args()

    remove_old_file(args.output)
    setup_crawler(args.cities, max_hotels=args.max_hotels, output=args.output)
