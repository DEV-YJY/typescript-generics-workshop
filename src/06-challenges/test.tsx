const MultiCombinedAccordion = ({
  dataList,
  monthRange,
}: AccordionPropsType) => {

  const { title, emissionDefinition, fileList } = dataList;
  const [isExpanded, setIsExpanded] = useState(

    Array(dataList.length)
      .fill({})
      .map(() => ({}))
  );

  const menuRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState("-1");
 
  const handleBlobClick = (e, index) => {
    e.stopPropagation();
    setActiveIndex(index === activeIndex ? "-1" : index);
  };

   const mockData: any = monthRange.scope2;
  const monthDivs: JSX.Element[] = [];

  for (let i = 0; i < mockData.length; i++) {
    if (mockData[i].status === "unavailable") {
      let endIdx = mockData.length;
      for (let j = i + 1; j < mockData.length; j++) {
        if (mockData[j].status !== "unavailable") {
          endIdx = j - 1;
          break;
        }
      }

      let periodText = "";

      if (endIdx !== i && mockData[endIdx + 1]?.month !== undefined) {
        const endMonth =
          mockData[endIdx]?.month && "-" + mockData[endIdx]?.month;
        periodText = `${mockData[i].month} ${endMonth}`;
      } else if (
        mockData[endIdx + 1]?.month === undefined &&
        mockData[endIdx - 1]?.status !== "unavailable"
      ) {
        periodText = `${mockData[i].month}`;
      } else if (
        mockData[endIdx + 1]?.month === undefined &&
        mockData[endIdx - 1]?.month !== undefined
      ) {
        const endMonth =
          mockData[endIdx - 2].status === "unavailable"
            ? "-" + mockData[endIdx - 1]?.month
            : "";
        periodText = `${mockData[i].month} ${endMonth}`;
      } else {
        periodText = mockData[i].month;
      }
      monthDivs.push(
        <div
          key={i}
          className="group relative flex h-[2.125rem] items-center justify-center rounded-2xl bg-red-400 font-semibold hover:cursor-pointer"
          style={{ gridColumn: `${i + 1} / ${endIdx + 2}` }}
          id={i.toString()}
          onClick={(e) => handleBlobClick(e, e.currentTarget.id)}
        >

          <div className="absolute flex  w-[95%] items-center justify-center rounded-2xl group-hover:bg-white">
            <div className="flex items-center justify-center">
              <div className="group-hover:text-red-400">{periodText}</div>
              <div className="ml-2 group-hover:text-red-400">
                <MdError className="h-[1.25rem] w-[1.25rem]" />
              </div>
            </div>
            {activeIndex === i.toString() && (
              <div className="absolute top-[2.125rem] z-50">
                <UserMenu
                  mainMessage={"You are missing data for this range."}
                  dropdownOptions={buttonMenus}
                />
              </div>
            )}
          </div>
        </div>
      )

      if (endIdx !== i) {
        i = endIdx;
      }
    } else {
      monthDivs.push(
        <div className="flex justify-center">
        </div>
      );
    }
  }

  const arrFormatter = (arr) => {
    const output = arr.map((item, idx) => {
      const comma = idx !== arr.length - 1 ? ", " : "";
      return `[${item}]${comma}`;
    });
    return output;
  };

  return (
    <div className="max-w-[85.0625rem] rounded-2xl bg-zinc-800 text-white">
      <section className="rounded-2xl bg-zinc-800">
        {dataList.map((item, dataListIdx) => {
          return (
            <div
              key={dataListIdx}
              className={`grid grid-cols-5 gap-1 rounded-2xl bg-zinc-800`}
            >
             <div className={`col-span-4 bg-zinc-800`}>
                {item.emissionDefinitions.source.map((fileList, fileIdx) => {
                  return (
                    <div className="row-span-1 mb-3" key={fileIdx}>
                      <div
                        className={`${
                          isExpanded[dataListIdx][fileIdx]
                            ? "border-b-2 border-teal-300"
                            : ""
                        } relative flex h-[4.0219rem] items-center bg-stone-600 text-lg`}
                        onClick={() => {
                          setIsExpanded((prevExpanded) => {
                            const newExpanded = [...prevExpanded];
                            newExpanded[dataListIdx] = {
                              ...newExpanded[dataListIdx],
                              [fileIdx]: !newExpanded[dataListIdx][fileIdx],
                            };
                            return newExpanded;
                          });
                        }}
                      >
                        <div className="absolute right-5 ml-[10%] mr-[2%] grid w-[63%] grid-cols-5">
                          {monthDivs}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default MultiCombinedAccordion;

notice clicking on this div:
        <div
          key={i}
          className="group relative flex h-[2.125rem] items-center justify-center rounded-2xl bg-red-400 font-semibold hover:cursor-pointer"
          style={{ gridColumn: `${i + 1} / ${endIdx + 2}` }}
          id={i.toString()}
          onClick={(e) => handleBlobClick(e, e.currentTarget.id)}
        >

pops up a UserMenu component. 

However since the component iterates the array and renders a lot of the same divs, clicking on individual one triggers the render of UserMenu component underneat all the same divs. So When I click on to pop up the usermenu component it pops up the usermenu component for all the divs. I want to expand and collapse the component individually. How can I achieve this

clicking on one div expands/collapses the UserMenu component for all the other divs as well