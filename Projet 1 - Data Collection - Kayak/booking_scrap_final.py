import os
import re
import argparse
import scrapy
from scrapy.crawler import CrawlerProcess

class BookingSpiderPage(scrapy.Spider):
    name = "booking"
    allowed_domains = ["booking.com"]

    def __init__(self, cities, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cities = cities

    def start_requests(self):
        """Génère les requêtes initiales pour chaque ville."""
        for city in self.cities:
            url = f"https://www.booking.com/searchresults.html?ss={city}"
            yield scrapy.Request(url=url, callback=self.parse, meta={"city": city})

    def parse(self, response):
        """Parse les informations des hôtels sur la page de recherche."""
        city = response.meta["city"]
        hotels = response.xpath("//div[@data-testid='property-card']")

        for hotel in hotels:
            hotel_data = self.extract_hotel_info(hotel, response)
            full_url = response.urljoin(hotel_data["url"])

            # Requête vers la page de l'hôtel pour extraire la latitude
            yield scrapy.Request(
                url=full_url,
                callback=self.parse_hotel,
                meta={
                    **hotel_data,
                    "city": city,
                }
            )

    def extract_hotel_info(self, hotel, response):
        """Extrait les informations de base d'un hôtel."""
        return {
            "name": hotel.xpath(".//div[@data-testid='title']/text()").get(),
            "url": hotel.xpath(".//a/@href").get(),
            "score": self.parse_score(hotel),
            "description": hotel.xpath("div[1]/div[2]/div/div/div[1]/div/div[3]/text()").get(),
        }

    def parse_score(self, hotel):
        """Extrait et convertit le score en float, renvoie None en cas d'erreur."""
        score = hotel.xpath("div[1]/div[2]/div/div/div[2]/div/div[1]/a/span/div/div[1]/div/text()").get()
        try:
            return float(score.split(" ")[-2])
        except (ValueError, TypeError, IndexError):
            return None

    def parse_hotel(self, response):
        """Parse la page de l'hôtel pour extraire la latitude."""
        script_content = response.xpath("/html/body/script[contains(text(), 'b_map_center_latitude')]/text()").get()
        latitude, longitude = self.extract_lat_lon_from_script(script_content)

        # Récupérer les données depuis meta 
        name = response.meta["name"]
        url = response.meta["url"]
        score = response.meta["score"]
        description = response.meta["description"]
        city = response.meta["city"]

        # Renvoyer les données extraites avec la latitude
        yield {
            "name": name,
            "url": url,
            "score": score,
            "description": description,
            "city": city,
            "latitude": latitude,
            "longitude": longitude
        }
    

    def extract_lat_lon_from_script(self, script_content):
        """Utilise une regex pour extraire la latitude et la longitude du script."""
        if script_content:
            lat_match = re.search(r'b_map_center_latitude\s*=\s*([\d.]+);', script_content)
            lon_match = re.search(r'b_map_center_longitude\s*=\s*([\d.]+);', script_content)
            latitude = lat_match.group(1) if lat_match else None
            longitude = lon_match.group(1) if lon_match else None
            return latitude, longitude
        return None, None


# Configuration des paramètres du crawler
def setup_crawler(cities):
    process = CrawlerProcess(settings={
        "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/97.0.4692.99 Safari/537.36",
        "FEEDS": {"hotels.json": {"format": "json", "encoding": "utf8"}},
        "AUTOTHROTTLE_ENABLED": True,
        "HTTPCACHE_ENABLED": True,
    })
    process.crawl(BookingSpiderPage, cities=cities)
    process.start()


# Supprimer l'ancien fichier si nécessaire
def remove_old_file(filename):
    if os.path.exists(filename):
        os.remove(filename)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Scrape Booking.com hotels.')
    parser.add_argument('--cities', nargs='+', help='List of cities to scrape', required=True)
    args = parser.parse_args()

    FILENAME = "hotels.json"
    remove_old_file(FILENAME)

    cities = args.cities  # Liste de villes à scraper passée via l'argument --cities
    setup_crawler(cities)
