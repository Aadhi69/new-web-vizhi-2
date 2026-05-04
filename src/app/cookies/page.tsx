import PolicyLayout from "@/components/PolicyLayout";

export default function CookiesPage() {
    return (
        <PolicyLayout
            title="Cookie Policy"
            lastUpdated="May 2026"
            content={
                <>
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. What are Cookies?</h2>
                        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information about your interaction with our spatial services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Why do we use Cookies?</h2>
                        <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our Services to operate, such as managing your session with our cloud intelligence layer. Other cookies enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Types of Cookies we use</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>Essential:</strong> These are strictly necessary to provide you with services available through our website.</li>
                            <li><strong>Analytics:</strong> These collect information that is used in aggregate form to help us understand how our website is being used.</li>
                            <li><strong>Performance:</strong> These are used to ensure the spatial interface loads efficiently and maintains high frame rates.</li>
                            <li><strong>Preferences:</strong> These allow our website to remember choices you make when you use the website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Managing Cookies</h2>
                        <p>You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">5. Updates to this Policy</h2>
                        <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons.</p>
                    </section>
                </>
            }
        />
    );
}
