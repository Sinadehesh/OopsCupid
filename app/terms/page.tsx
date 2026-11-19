export const metadata = {
  alternates: { canonical: "https://www.oopscupid.com/terms" },
  title: "Terms of Service: OopsCupid",
  description: "Read the Terms of Service for OopsCupid, the psychology-based relationship and self-awareness platform.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: November 19, 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>OopsCupid</strong> (available at{" "}
            <a href="https://www.oopscupid.com">oopscupid.com</a>), you agree to be bound by these Terms of Service
            (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms, you may not access the Service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            OopsCupid is a psychology-based web platform that offers self-awareness tools, relationship quizzes,
            attachment style assessments, behavioral analysis features, and educational content about relationships
            and interpersonal dynamics. The Service is intended for informational and entertainment purposes only
            and does not constitute professional psychological or therapeutic advice.
          </p>
        </section>

        <section>
          <h2>3. Eligibility</h2>
          <p>
            You must be at least <strong>13 years old</strong> to use the Service. By using OopsCupid, you represent
            and warrant that you meet this age requirement. If you are under 18, you should review these Terms with
            a parent or guardian.
          </p>
        </section>

        <section>
          <h2>4. User Accounts</h2>
          <ul>
            <li>You may sign in using your Google account. You are responsible for maintaining the security of your account.</li>
            <li>You agree to provide accurate and up-to-date information.</li>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>You may not share your account credentials with others or use another person&apos;s account.</li>
          </ul>
        </section>

        <section>
          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose or in violation of any applicable law</li>
            <li>Upload or share content that is abusive, harassing, defamatory, or harmful to others</li>
            <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure</li>
            <li>Use automated scripts, bots, or scrapers to access the Service without permission</li>
            <li>Reverse engineer, decompile, or disassemble any portion of the Service</li>
            <li>Interfere with the proper functioning of the Service</li>
            <li>Upload content containing malware, viruses, or any harmful code</li>
          </ul>
        </section>

        <section>
          <h2>6. User Content</h2>
          <p>
            Certain features (such as chat analysis) allow you to submit text content. By submitting content,
            you grant OopsCupid a non-exclusive, worldwide, royalty-free license to use that content solely
            to provide and improve the Service. You represent that you own the content or have the right to share it.
          </p>
          <p>
            We do not claim ownership of your personal content and will not use it for any purpose beyond
            providing the Service.
          </p>
        </section>

        <section>
          <h2>7. Payments, Refunds, and Returns</h2>

          <h3>7.1 Payments</h3>
          <p>
            Payments are processed securely by Stripe. Prices are shown in euros (EUR). Every purchase is a
            single payment: there are no subscriptions and nothing renews.
          </p>

          <h3>7.2 Digital Purchases: 7-Day Refund</h3>
          <p>
            Reports, personal reads, guides and programmes can be refunded <strong>in full within 7 days of
            purchase, no questions asked</strong>. Email{" "}
            <a href="mailto:Sinadehesh@gmail.com">Sinadehesh@gmail.com</a> from, or with, the email address you
            paid with. Refunds go back to your original payment method, usually within 5 to 10 business days.
          </p>

          <h3>7.3 Coaching Sessions</h3>
          <p>
            If a coaching session isn&apos;t useful, say so within its first 15 minutes and the session is
            refunded in full.
          </p>

          <h3>7.4 General</h3>
          <p>
            We may decline a refund where there is clear evidence of abuse or fraud, for example repeatedly
            buying and refunding the same product. Nothing in these Terms affects your statutory rights as a
            consumer.
          </p>
        </section>

        <section>
          <h2>8. Intellectual Property</h2>
          <p>
            All content on OopsCupid, including but not limited to text, quizzes, graphics, logos, and software,
            is the property of OopsCupid or its licensors and is protected by applicable intellectual property laws.
            You may not reproduce, distribute, or create derivative works without our express written consent.
          </p>
        </section>

        <section>
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> basis without warranties
            of any kind, either express or implied. OopsCupid does not warrant that the Service will be
            uninterrupted, error-free, or free of harmful components.
          </p>
          <p>
            The quizzes, assessments, and content on OopsCupid are for <strong>informational and entertainment
            purposes only</strong> and are not a substitute for professional psychological, psychiatric, or medical advice.
          </p>
        </section>

        <section>
          <h2>10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, OopsCupid and its operators shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising from your use of, or
            inability to use, the Service. Our total liability to you for any claim arising out of these Terms
            shall not exceed the amount you paid us (if any) in the twelve months preceding the claim.
          </p>
        </section>

        <section>
          <h2>11. Third-Party Services</h2>
          <p>
            The Service integrates with third-party services such as Google (for authentication) and AI providers
            (for analysis features). Your use of those services is governed by their respective terms and privacy
            policies. We are not responsible for the practices of third-party services.
          </p>
        </section>

        <section>
          <h2>12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Service at any time, with or without
            notice, if you violate these Terms or for any other reason at our discretion. You may stop using the
            Service at any time and request account deletion by contacting us.
          </p>
        </section>

        <section>
          <h2>13. Modifications to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Service after changes are posted
            constitutes your acceptance of the revised Terms. We will indicate the date of the last update at
            the top of this page.
          </p>
        </section>

        <section>
          <h2>14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard
            to conflict of law principles. Any disputes shall be resolved through good-faith negotiation, and
            if unresolved, through competent courts.
          </p>
        </section>

        <section>
          <h2>15. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>Email: <a href="mailto:Sinadehesh@gmail.com">Sinadehesh@gmail.com</a></li>
            <li>Website: <a href="https://www.oopscupid.com">oopscupid.com</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
}
