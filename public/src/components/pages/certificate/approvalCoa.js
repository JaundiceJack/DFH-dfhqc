import CategoryHeader from './categoryHeader.js';

const Approvals = () => {
  return (
    <div id="signatures">
      <CategoryHeader title="Approvals" testing="" keys={false}/>
      <div className="w-full h-full px-2 py-8 flex flex-col items-center justify-center">
        <div className="flex flex-row mb-4">
          <p>Created By:</p>
          <p>___________________________________________________________</p>
        </div>
        <div className="flex flex-row">
          <p>Approved By:</p>
          <p>___________________________________________________________</p>
        </div>

      </div>
    </div>
  )
}


export default Approvals;
