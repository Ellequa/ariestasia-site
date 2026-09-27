# Commission form setup

The homepage uses FormSubmit because this project produces static files and has no configured hosting provider, native form integration, or server adapter. No account, API key, database, or new dependency is required.

## One-time activation before launch

1. Open the deployed homepage through its real HTTPS address and submit a clearly labelled test commission enquiry using an email address you control. This initiates FormSubmit activation if this recipient is not yet activated.
2. Open `indyariestasia@gmail.com`, including Spam, and follow the activation link from FormSubmit. Repeat activation if the service requests it for the deployed form.
3. Submit a second test enquiry from the live site. Confirm that it arrives in that inbox, that all five fields are included, and that Reply addresses the visitor's submitted email. Do not consider email delivery verified until this test passes.

FormSubmit receives the enquiry over HTTPS and forwards it to `indyariestasia@gmail.com`. The `email` field supplies Reply-To. The destination email is public, not a private credential. Provider acceptance is what triggers the in-page thank-you message; it cannot prove inbox delivery or completion of recipient activation.

## Behaviour

- Native browser validation requires name, valid email, piece type, and a message; budget is optional.
- A small progressively enhanced script displays sending/success/failure states without navigating away. Duplicate submissions are prevented while a request is pending. Network errors, rejected responses, invalid responses, and a 30-second timeout preserve the entered values for retry.
- Without JavaScript, standard HTML POST works and FormSubmit displays confirmation/error pages.
- A hidden `_honey` field provides lightweight spam protection. CAPTCHA is disabled to keep AJAX submission inline; this is basic protection, not a guarantee against bots. If spam becomes a problem, reassess CAPTCHA or a handler with stronger server-side controls.

Official setup and AJAX documentation:
https://formsubmit.co/documentation
https://formsubmit.co/ajax-documentation
https://formsubmit.co/help

