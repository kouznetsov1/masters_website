export default function TableFilterWindow() {
  return (
    <div className="sticky h-full w-1/5 border-2">
      <div>
        <ProgramFilter />
        <AreaFilter />
        <PrecisionFilter />
      </div>
    </div>
  );
}

const ProgramFilter = () => {
  return (
    <div>
      <span>ProgramFilter</span>
    </div>
  );
};

const AreaFilter = () => {
  return (
    <div>
      <span>AreaFilter</span>
    </div>
  );
};

const PrecisionFilter = () => {
  return (
    <div>
      <span>PrecisionFilter</span>
    </div>
  );
};
