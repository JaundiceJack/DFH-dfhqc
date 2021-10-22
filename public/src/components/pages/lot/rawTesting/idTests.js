import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import Button from '../../../button.js';
import TestLine from './testLine.js';
import AddSample from './addSample.js';

const IdentityTests = ({ lot }) => {
  const [showIdentitySampling, setShowIdentitySampling] = useState(false);

  return (
    <div className="bg-gray-600 rounded text-blue-100 font-semibold min-h-200">
      <div className="flex flex-row px-2 py-1">
        <h3 className="text-lg text-left px-2 text-blue-200">Identities</h3>
        <div className="flex-grow"></div>
      </div>
      <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"/>
      <div className="grid gap-y-2 p-2">
      {/*
        { lot && lot.item && lot.item.ids.map((identity, index) => {
          return <TestLine key={index}
            testName={identity.identity.name}
            type='identity'
            lotId={lot._id}
            isTested={true}
            results={lot.testing.identity}
            toggle={showIdentitySampling}
            showSampling={() => setShowIdentitySampling(true)} />
          })
        }
        */}
      </div>
    </div>
  )
}

export default IdentityTests;
