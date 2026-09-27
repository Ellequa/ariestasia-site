# Commission form setup

The homepage uses FormSubmit because this project produces static files on Cloudflare Pages and needs no server adapter. No account, API key, database, or new dependency is required.

## One-time activation before launch

1. Open the deployed homepage through its real HTTPS address and submit a clearly labelled test commission enquiry using an email address you control. This initiates FormSubmit activation if this recipient is not yet activated.
2. Open `indyariestasia@gmail.com`, including Spam, and follow the activation link from FormSubmit. Repeat activation if the service requests it for the deployed form.
3. Submit a second test enquiry from the live site. Confirm that it arrives in that inbox, that all five fields are included, and that Reply addresses the visitor's submitted email. Do not consider email delivery verified until this test passes.

FormSubmit receives the enquiry over HTTPS and forwards it to `indyariestasia@gmail.com`. The `email` field supplies Reply-To. The destination email is public, not a private credential. FormSubmit displays its own activation, confirmation or error page after submission. A confirmation cannot prove inbox delivery.

## Behaviour

- Native browser validation requires name, valid email, piece type, and a message; budget is optional.
- Standard HTML POST goes directly to `https://formsubmit.co/indyariestasia@gmail.com`. There is no fetch interception, CORS preflight or JSON response parsing. FormSubmit displays activation, confirmation and errors directly. No JavaScript is needed.
- A hidden `_honey` field provides lightweight spam protection. CAPTCHA remains disabled; this is basic protection, not a guarantee against bots. If spam becomes a problem, reassess CAPTCHA or a handler with stronger server-side controls.

## Production diagnosis — 27 September 2026

The deployed AJAX request reproduced the generic failure. The endpoint returned HTTP 200 with CORS allowed and a valid JSON body containing `success: "false"` and `This form needs Activation`. The script treated this provider activation response as a general failure. Standard HTML submission was tested from the corrected local site and reached FormSubmit’s `Check Your Email` page. The provider reports that it sent an activation email; inbox receipt remains unverified. Deploy the updated code, activate from the destination inbox, then test delivery again. The existing deployment has not been changed.

Official documentation:
https://formsubmit.co/documentation
https://formsubmit.co/ajax-documentation
https://formsubmit.co/help

