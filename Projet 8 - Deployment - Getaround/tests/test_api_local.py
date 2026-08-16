import requests

payload = {
    "input": [
        [
            "Citroën",
            140411,
            100,
            "diesel",
            "black",
            "convertible",
            1,
            1,
            0,
            0,
            1,
            1,
            1,
        ]
    ]
}
print(requests.post("http://localhost:8000/predict", json=payload).json())
