export const metadata = {
  title: 'Privacy Policy - AFIP Invoice Helper',
  description: 'Privacy policy for the AFIP Invoice Helper Chrome extension',
}

export default function PrivacyPolicy() {
  return (
    <div className='min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>Privacy Policy</h1>
        <div className='prose prose-lg space-y-6 text-gray-700'>
          <section>
            <h2 className='mb-4 text-2xl font-semibold text-gray-900'>AFIP Invoice Helper Chrome Extension</h2>
            <p className='mb-4'>
              This privacy policy describes how the AFIP Invoice Helper Chrome extension handles your data.
            </p>
          </section>

          <section>
            <h3 className='mb-3 text-xl font-semibold text-gray-900'>Data Collection</h3>
            <p className='mb-4'>
              The AFIP Invoice Helper extension only stores data locally on your device using Chrome's storage API. We
              do not collect, transmit, or store any personal information on external servers.
            </p>
          </section>

          <section>
            <h3 className='mb-3 text-xl font-semibold text-gray-900'>Data Usage</h3>
            <p className='mb-4'>
              The extension stores client data and invoice templates locally to help automate your AFIP invoice creation
              process. This data remains on your device and is only used to populate forms on the AFIP website
              (fe.afip.gob.ar).
            </p>
          </section>

          <section>
            <h3 className='mb-3 text-xl font-semibold text-gray-900'>Permissions</h3>
            <p className='mb-4'>The extension requires the following permissions:</p>
            <ul className='mb-4 list-disc pl-6'>
              <li>
                <strong>Storage:</strong> To save your client data and templates locally
              </li>
              <li>
                <strong>Active Tab:</strong> To interact with the current AFIP tab
              </li>
              <li>
                <strong>Side Panel:</strong> To display the extension interface
              </li>
              <li>
                <strong>Host Permissions (fe.afip.gob.ar):</strong> To automate form filling on AFIP website
              </li>
            </ul>
          </section>

          <section>
            <h3 className='mb-3 text-xl font-semibold text-gray-900'>Data Security</h3>
            <p className='mb-4'>
              All data is stored locally on your device using Chrome's secure storage mechanisms. No data is transmitted
              to external servers or third parties.
            </p>
          </section>

          <section>
            <h3 className='mb-3 text-xl font-semibold text-gray-900'>Data Deletion</h3>
            <p className='mb-4'>
              You can delete all stored data by uninstalling the extension or clearing the extension's data through
              Chrome's extension management interface.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
