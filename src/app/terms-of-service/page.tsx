import { getConfig } from '@/lib/stats';

export default function TermsOfService() {
  const siteName = getConfig().siteName;
  return (
    <div className="min-h-screen bg-gray-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          {siteName} Terms of Service
        </h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <div className="bg-gray-100 p-6 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700">
            ATTENTION: THIS IS A LEGALLY-BINDING CONTRACT. PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THIS AGREEMENT GOVERNS YOUR RELATIONSHIP WITH {siteName} AND USE OF THE SERVICES PROVIDED THROUGH THE WEBSITE. {siteName} HEREBY REQUESTS THAT YOU ACCEPT THESE TERMS OF SERVICE. YOU MAY USE THE SERVICES PROVIDED THROUGH THE WEBSITE ONLY ON THE CONDITION THAT YOU ACCEPT ALL OF THE TERMS AND CONDITIONS CONTAINED HEREIN. USING THE SERVICES PROVIDED THROUGH THE WEBSITE INDICATES THAT YOU ACCEPT THESE TERMS OF SERVICE. IF YOU DO NOT ACCEPT THESE TERMS OF SERVICE, DO NOT USE THE WEBSITE OR SERVICES.
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms of Service</h2>
            <p className="mb-4">
              These Terms of Service (the "Agreement" or "Terms of Service") is a legally-binding agreement between you, either an individual or an entity ("you" or "user"), and {siteName} ("{siteName}") regarding the use of the {siteName} website, products, and services (collectively, the "Website" and "Services"). {siteName} makes the Website and Services, including all content, information, graphics, documents, text, products, and all other elements (collectively, the "Content") available for your use subject to the terms and conditions set forth in this document. By accessing and using the Website and Services, you agree to be bound by and to accept these Terms of Service and all terms and conditions contained and/or referenced herein.
            </p>
            <p className="mb-4">
              If you do NOT agree to all the terms and conditions in these Terms of Service, you should NOT use the Website or Services. When you use any current or future {siteName} service or visit {siteName}'s Website, you will be subject to the guidelines and conditions applicable to such products or services.
            </p>
            <p className="mb-4">
              These Terms of Service may be amended by {siteName} at any time upon notice provided through a posting on the main page of the Website or via email. Please check these Terms of Service regularly to ensure that you are aware of all terms governing your use of the Website and Services.
            </p>
            <p>
              {siteName} reserves the right to make changes or updates with respect to the Content or the format thereof at any time without notice. {siteName} also reserves the right to terminate or restrict your access to the Website and Services or any portion thereof for any reason whatsoever at its sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Description of Services</h2>
            <p>
              {siteName} provides a free online video downloader that allows you to download videos and files from multiple platforms in original HD quality without any watermarks. The service requires no login or app installation and works directly through web browsers across supported devices (including iPhone, iPad, Android, Windows, and Mac).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Users' Obligations</h2>
            <p className="mb-4">
              You agree to use the Website and Services only for purposes permitted by these Terms of Service as well as any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
            </p>
            <p className="font-semibold text-gray-800 mb-4">
              {siteName} IS NOT RESPONSIBLE FOR ANY VIOLATION OF APPLICABLE LAWS, RULES, OR REGULATIONS COMMITTED BY YOU OR A THIRD PARTY AT YOUR BEHEST. IT IS YOUR RESPONSIBILITY TO ENSURE THAT YOUR USE OF THE {siteName} WEBSITE AND SERVICES DOES NOT CONTRAVENE APPLICABLE LAWS, RULES, OR REGULATIONS.
            </p>
            <p>
              Specifically, you agree and warrant that in using the Website and Services, your actions do not contravene applicable local, national, or international laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Use of the Website and Services</h2>
            <p className="mb-4">
              You agree not to access (or attempt to access) the Services by any means other than through the interface provided by {siteName}. You agree not to access (or attempt to access) the Services by way of automated means and that you will not engage in any activity that interferes with or disrupts the Services (or the servers and networks connected to the Services).
            </p>
            <p className="mb-2">Further, you agree:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Not to disrupt or interfere with any other user's enjoyment of the Website and Services.</li>
              <li>Not to upload, post, or otherwise transmit through the Website and Services any viruses or other harmful, disruptive, or destructive files.</li>
              <li>Not to disrupt or interfere with the security of, or otherwise cause harm to, the Website, Services, Content, system resources, servers, or networks connected to or accessible through the Website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Content and Intellectual Property</h2>
            <p className="mb-4">
              You are solely responsible for any links you submit or content you download using the Service. {siteName} does not own, review, inspect, edit, or monitor any third-party content downloaded or accessed by you or any other user. It is your responsibility to investigate the licensing of any content prior to using it and to ensure that your use complies with all applicable laws, copyright restrictions, and licensing requirements without infringing third-party rights.
            </p>
            <p>
              Copyright, trademark, and all other proprietary rights in the Website, {siteName}, Services, and Content (excluding third-party user-submitted links or downloads) belong to {siteName} and/or its licensors. You agree not to copy, republish, frame, transmit, modify, sell, distribute, or create derivative works based on the Content or Website outside the intended functionality provided by {siteName}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Support & Contact Information</h2>
            <p className="mb-4">
              {siteName} provides support for users. If you have questions, require technical assistance, or wish to submit inquiries regarding these Terms of Service or potential copyright concerns, you may contact us via email at:
            </p>
            <p className="font-medium text-gray-900 bg-gray-50 p-4 rounded-lg inline-block mb-4">
              Email: {siteName}@gmail.com
            </p>
            <p>
              When contacting support, please describe the nature of your issue clearly so that {siteName} can make reasonable efforts to respond in a timely manner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Warranties and Disclaimers</h2>
            <p className="font-semibold text-gray-800 mb-4">
              ALL CONTENT AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE". {siteName} HEREBY EXPRESSLY DISCLAIMS ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR AS TO THE OPERATION OF THIS WEBSITE OR SERVICES.
            </p>
            <p className="font-semibold text-gray-800 mb-4">
              THE USE OF THE WEBSITE OR SERVICES IS DONE AT YOUR OWN DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM, LOSS OF DATA, OR OTHER HARM THAT RESULTS FROM SUCH ACTIVITIES.
            </p>
            <p className="font-semibold text-gray-800">
              IN NO EVENT SHALL {siteName} BE LIABLE FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, PUNITIVE, SPECIAL, OR INCIDENTAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE USE OF, OR INABILITY TO USE, THE WEBSITE OR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {siteName}, its affiliates, officers, directors, agents, and employees from any expense, loss, claim, damage, fine, penalty, or liability (including reasonable attorneys' fees) resulting from any third-party claim or legal action arising out of your breach of these Terms of Service or violation of any applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
            <p>
              These Terms of Service remain effective until terminated by either you or {siteName}. You may terminate this agreement at any time by ceasing all use of the Website and Services. {siteName} reserves the right to suspend or discontinue the Services or terminate your access at any time, at its sole discretion, without prior notice or liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Miscellaneous</h2>
            <p>
              If any provision of these Terms of Service is held to be invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect. {siteName}’s failure to enforce any right or provision of these Terms of Service will not be deemed a waiver of such right or provision.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
