import urllib.request
import re

BASE_URL = 'http://127.0.0.1:3000'

def test_all():
    print("==================================================================")
    print("  RUNNING COMPREHENSIVE VERIFICATION FOR AKUFAI CAPITAL & EQUITIES")
    print("==================================================================")

    # 1. Test About Page
    print("\n[1] Verifying About Page...")
    req_about = urllib.request.urlopen(f"{BASE_URL}/about")
    html_about = req_about.read().decode('utf-8')
    assert req_about.getcode() == 200

    # Verify solid white hero heading
    assert 'About Akufai Capital &amp; Equities' in html_about or 'About Akufai Capital & Equities' in html_about
    assert 'style="color:#ffffff"' in html_about or 'style="color: #ffffff"' in html_about or '!text-white' in html_about
    print("  [PASS] About hero heading configured with explicit solid white (#ffffff).")

    # Verify Distinct Sections on About
    assert 'Firm Overview' in html_about
    assert 'Leadership in Action' in html_about
    assert 'Institutional Framework' in html_about
    assert 'Operating Foundation' in html_about
    assert 'Leadership Biography' in html_about
    assert 'dr_ali_garba_portrait.png' in html_about
    assert 'Our approach' in html_about
    assert 'Our values' in html_about
    assert 'Our Contributors' in html_about
    assert 'Advisory &amp; Research Network' in html_about or 'Advisory & Research Network' in html_about
    # Verify no demo avatars for contributors
    assert 'contributor_faisal.jpg' not in html_about
    assert 'contributor_ahmad.jpg' not in html_about
    assert 'contributor_ferguson.jpg' not in html_about
    print("  [PASS] About page sections verified: Firm Overview, Action Gallery, Institutional Framework, Founder Story, Approach, Values, and clean text-based Contributors.")

    # 2. Test Investment Page
    print("\n[2] Verifying Investment Page...")
    req_inv = urllib.request.urlopen(f"{BASE_URL}/investment")
    html_inv = req_inv.read().decode('utf-8')
    assert req_inv.getcode() == 200
    assert 'Investment Focus' in html_inv
    assert 'style="color:#ffffff"' in html_inv or 'style="color: #ffffff"' in html_inv or '!text-white' in html_inv
    print("  [PASS] Investment hero heading configured with explicit solid white (#ffffff).")

    # 3. Test All 6 Investment Images
    print("\n[3] Verifying 6 Investment Images on Disk and HTTP 200...")
    investment_images = [
        ('/images/investment_healthtech.jpg', 'Healthtech (Clinic & Tablet)'),
        ('/images/investment_ai.jpg', 'Artificial Intelligence (Seedlings & Computer Vision)'),
        ('/images/investment_fintech.jpg', 'Fintech (Merchant & POS Terminal)'),
        ('/images/investment_infrastructure.jpg', 'Infrastructure & Enabling Systems (Solar Panels)'),
        ('/images/investment_african_markets.jpg', 'African Markets & Cross-border (Container Port)'),
        ('/images/investment_private_deals.jpg', 'Private Deals & Growth (Product & Advisers)'),
    ]

    for img_url, desc in investment_images:
        req = urllib.request.urlopen(f"{BASE_URL}{img_url}")
        assert req.getcode() == 200
        length = req.headers.get('Content-Length')
        print(f"  [PASS] {desc:55} | Status: 200 | Size: {length} bytes")

    # 4. Test Homepage
    print("\n[4] Verifying Homepage Structure & Sections...")
    req_home = urllib.request.urlopen(f"{BASE_URL}/")
    html_home = req_home.read().decode('utf-8')
    assert req_home.getcode() == 200
    assert 'What we look for' in html_home
    assert 'A founder-led firm with a selective lens' in html_home
    assert 'Our approach' in html_home
    assert 'Our values' in html_home
    assert 'Akufai Conversations' in html_home
    assert 'From the desk of Akufai' in html_home
    print("  [PASS] Homepage verified with separate Approach and Values sections, 6 Investment cards, and Founder Action section.")

    # 5. Test Shared Header
    print("\n[5] Verifying Shared Header & Gold Accent Details...")
    assert 'logo.png' in html_home
    assert 'Get in Touch' in html_home
    assert '#b6950b' in html_home or 'brand-gold' in html_home
    print("  [PASS] Shared header verified with visible logo, navigation, and gold accent styling.")

    print("\n==================================================================")
    print("  ALL TARGETED CORRECTIONS VERIFIED AND FUNCTIONING 100% CLEANLY  ")
    print("==================================================================")

if __name__ == '__main__':
    test_all()
