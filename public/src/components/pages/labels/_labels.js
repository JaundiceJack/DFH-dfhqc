import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLot } from '../../../actions/lotActions.js';
import Detail from '../../misc/detail.js'
import Label from './label.js';

const Labels = ({ match }) => {
  const selected = useSelector(state => state.lot.selectedLot);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!selected.raw && !selected.blend && !selected.bulk && !selected.fg)
      dispatch(getLot(match.params.lotId));
  }, [dispatch, match, selected])

  return (
    <div className="grid grid-cols-2 items-start justify-start gap-y-0 gap-x-6 mx-auto bg-white rounded-xl -mt-4" style={{width: 60+"em", height: 59+"em"}}>
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
      <Label lot={selected.lot} item={
        selected.type === 'raw' ? selected.raw :
        selected.type === 'blend' ? selected.blend :
        selected.type === 'bulk' ? selected.bulk :
        selected.type === 'fg' && selected.fg} />
    </div>
  )
}

export default Labels;
