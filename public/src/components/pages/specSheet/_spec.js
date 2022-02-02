// Import Basics
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Server Actions
import { getRaw } from '../../../actions/rawActions.js';
// Import Components
import Detail from '../../misc/detail.js'
import Spinner from '../../misc/spinner.js';

const Spec = ({ match }) => {
  const { selectedRaw, loading } = useSelector(state => state.raw);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedRaw._id)
      dispatch(getRaw(match.params.rawId));
  }, [dispatch, match, selectedRaw]);

  return (
    <div className="flex flex-col w-full mx-auto bg-gray-100 rounded-xl" style={{width: 50+"em"}}>
      <div className="flex items-center justify-center w-full h-12 bg-gray-200 rounded-t-xl">
        <p className="text-center font-bold text-lg">Specification Sheet</p>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black to-transparent" />
      {loading ? <Spinner /> :
        <div className="flex flex-col w-full bg-gray-100 rounded-b-xl">
          <div id="basic" className="px-10 py-4 grid grid-cols-2 mb-6">
            <Detail label="Name:" data={selectedRaw && selectedRaw.name} color="text-black" />

            <Detail label="Item #:" data={selectedRaw && selectedRaw.number} color="text-black" />
          </div>
        </div>
      }
    </div>
  )
}

export default Spec;
