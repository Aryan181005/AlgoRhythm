const AlgoInfo = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1 className="text-2xl mb-4">{data.title}</h1>

      <div className="mb-3 text-gray-200">{data.info.intro}</div>

      <h3 className="text-lg font-semibold mb-2">How it works:</h3>
      <ul className="list-decimal pl-5 space-y-0.5 text-sm mb-3 text-gray-200">
        {data.info.steps.map((step, i) => (
          <li key={i}>
            {step}
          </li>
        ))}
      </ul>

        <h3 className="text-lg font-semibold mb-2">Time Complexity:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-3 text-gray-200">
            <li>
                Best Case: <span className="text-green-500 font-bold">{data.info.complexity.best}</span>
            </li>
            <li>
                Average Case: <span className="text-green-500 font-bold">{data.info.complexity.average}</span>
            </li>
            <li>
                Worst Case: <span className="text-red-400 font-bold">{data.info.complexity.worst}</span>
            </li>
        </ul>

      <p className="mt-4 text-sm text-gray-400">{data.info.footer}</p>
    </div>
  );
};

export default AlgoInfo;
