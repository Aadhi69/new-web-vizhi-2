import PolicyLayout from "@/components/PolicyLayout";

export default function TermsPage() {
    return (
        <PolicyLayout
            title="Terms of Service"
            lastUpdated="May 2026"
            content={
                <>
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                        <p>These Terms of Service constitute a legally binding agreement made between you ("User") and Vizhi XR ("Company," "we," "us," or "our") concerning your access to and use of our website, applications, and spatial computing hardware.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Intellectual Property Rights</h2>
                        <p>Unless otherwise indicated, the Services and all source code, databases, functionality, software, website designs, and hardware designs are our proprietary property. You are granted a limited, non-exclusive, non-transferable license to access and use the Services for your internal business or personal purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Prohibited Activities</h2>
                        <p>You may not access or use the Services for any purpose other than that for which we make the Services available. Prohibited activities include:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Attempting to reverse engineer any part of our spatial hardware or software.</li>
                            <li>Using the Services in any manner that could damage, disable, or impair our infrastructure.</li>
                            <li>Engaging in unauthorized data collection or extraction from our spatial network.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Device Usage and Safety</h2>
                        <p>Usage of Vizhi XR hardware requires strict adherence to safety guidelines provided with the device. We are not liable for improper use of the spatial interface in environments that pose physical risks. You are responsible for maintaining awareness of your physical surroundings while using our AR services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
                        <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of our Services.</p>
                    </section>
                </>
            }
        />
    );
}
