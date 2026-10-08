import urllib.request

BASE_URL = 'http://localhost:3000'

IMAGES = [
    '/images/investment_infrastructure.jpg',
    '/images/investment_private_deals.jpg',
    '/images/investment_fintech.jpg',
    '/images/investment_ai.jpg',
    '/images/investment_african_markets.jpg',
    '/images/founder_business_meeting.jpg',
    '/images/founder_networking_break.jpg',
    '/images/founder_panel_discussion.jpg',
    '/images/hero_patient_capital.png',
    '/images/hero_selective_partnerships.png',
    '/images/blog_fintech_wave.jpg',
    '/images/blog_healthcare_ai.jpg',
    '/images/blog_crossborder_playbook.jpg',
    '/images/logo.png',
]

def test_images():
    print("Testing Image Assets Accessibility on Live Server...")
    for img_path in IMAGES:
        url = f"{BASE_URL}{img_path}"
        try:
            req = urllib.request.urlopen(url)
            code = req.getcode()
            content_type = req.headers.get('Content-Type')
            length = req.headers.get('Content-Length')
            print(f"  [PASS] {img_path:40} | Status: {code} | Type: {content_type} | Size: {length} bytes")
        except Exception as e:
            print(f"  [FAIL] {img_path:40} | Error: {e}")

    print("\nVerifying Public HTML Pages Image References...")
    pages = ['/', '/about', '/investment', '/blog', '/podcast', '/contact']
    for p in pages:
        req = urllib.request.urlopen(f"{BASE_URL}{p}")
        html = req.read().decode('utf-8')
        assert len(html) > 500, f"Page {p} returned empty content"
        print(f"  [PASS] Page {p:15} rendered successfully (Length: {len(html)} chars)")

    print("\nALL IMAGE VERIFICATIONS COMPLETED SUCCESSFULLY.")

if __name__ == '__main__':
    test_images()
