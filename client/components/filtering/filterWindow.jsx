export default function TableFilterWindow() {
  return (
    <div className="sticky h-full w-40 lg:w-96 border-r-2 border-neutral-800 overflow-auto">
      <div>
        <ProgramFilter />
        <AreaFilter />
        <PrecisionFilter />
      </div>
    </div>
  );
}

const ProgramFilter = () => {
  var programs = {
    D: "Datateknik",
    DPU: "Design- & produktutveckling",
    ED: "Elektronikdesign",
    EMM: "Energi - miljö - management",
    I: "Industriell Ekonomi",
    IT: "Informationsteknologi",
    KB: "Kemisk biologi",
    KTS: "Kommunikation, transport och samhälle",
    M: "Maskinteknik",
    MED: "Medicinsk teknisk",
    MT: "Medieteknik",
    U: "Mjukvaruteknik",
    TBI: "Teknisk Biologi",
    Y: "Teknisk fysik och elektroteknik",
  };

  const setProgram = (program) => {
    console.log(program);
  };

  return (
    <div className="m-1 px-2">
      <div className="my-2">
        <h3 className="text-2xl font-medium">Program</h3>
      </div>
      <div className="border-4 border-neutral-600 overflow-auto h-96">
        {Object.entries(programs).map(([code, program]) => (
          <button
            className="text-start border-[1px] m-1 w-80 hover:bg-neutral-700 hover:text-white "
            onClick={() => {
              setProgram(code);
            }}
          >
            <span className="m-2 text-lg text-start">{program}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const AreaFilter = () => {
  var programs = {
    D: "Datateknik",
    DPU: "Design- & produktutveckling",
    ED: "Elektronikdesign",
    EMM: "Energi - miljö - management",
    I: "Industriell Ekonomi",
    IT: "Informationsteknologi",
    KB: "Kemisk biologi",
    KTS: "Kommunikation, transport och samhälle",
    M: "Maskinteknik",
    MED: "Medicinsk teknisk",
    MT: "Medieteknik",
    U: "Mjukvaruteknik",
    TBI: "Teknisk Biologi",
    Y: "Teknisk fysik och elektroteknik",
  };

  return (
    <div>
      <span>AreaFilter</span>
    </div>
  );
};

const PrecisionFilter = () => {
  var examinations = ["TEN", "LAB", "UPG", "KTR", "HEM", "BAS", "PRA"];

  return (
    <div>
      <span>PrecisionFilter</span>
    </div>
  );
};
