"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { FilterContentType } from "./SearchPageData";
import { FilterStateObjectType } from "@/app/search-bus/BustListPage";

interface FilterAccordianType {
  isSearchable: boolean;
  title: string;
  contentsList: FilterContentType[];
  filterStateProps: {
    filterState: FilterStateObjectType;
    setFilterState: Dispatch<SetStateAction<FilterStateObjectType>>;
  };
}

const FilterAccordian = ({
  isSearchable,
  title,
  contentsList,
  filterStateProps,
}: FilterAccordianType) => {
  let { filterState, setFilterState } = filterStateProps;
  const [filteredContentsList, setFilteredContentsList] = useState<
    FilterContentType[]
  >([...contentsList]);
  const [selectedFilters, setSelectedFilters] = useState<number>(0);

  const SearchFiltersFromList = (
    text: string,
    contList: FilterContentType[]
  ) => {
    const filtered = contList.filter((filter: FilterContentType) =>
      filter.filterId.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setFilteredContentsList(filtered);
  };

  useEffect(() => {
    let tempSelected = 0;
    contentsList.forEach((flt) => {
      if (filterState[flt.filterId].isActive) {
        tempSelected += 1;
      }
    });

    setSelectedFilters(tempSelected);
  }, [filterState]);

  const handleFilterChange = (isChecked: boolean, filterID: string) => {
    let tempFilterState: FilterStateObjectType = Object.assign({}, filterState);
    tempFilterState[filterID].isActive = isChecked;
    setFilterState(tempFilterState);
  };
  return (
    <Accordion
      sx={{
        "&.MuiAccordion-root": {
          boxShadow: "none",
          borderTop: "1px solid #e2e8f0",
        },
        "&.MuiAccordion-root::before": {
          display: "none",
        },
        "&.Mui-expanded": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        sx={{
          "&.MuiButtonBase-root": {
            gap: "16px",
          },
        }}
      >
        <div className="flex flex-col ">
          <span className="text-base font-bold">{title}</span>
          {selectedFilters > 0 && (
            <span className="text-sm text-[#1d1d1da3]">
              {selectedFilters > 0 ? `${selectedFilters} selected` : ""}
            </span>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {isSearchable && (
            <li className="pb-4">
              <input
                type="text"
                className="py-4 px-5 w-full h-full rounded-s-full rounded-e-full bg-[#f2f2f8] placeholder:text-gray-500 outline-none"
                placeholder={"Search " + title.toLocaleLowerCase()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  SearchFiltersFromList(e.currentTarget.value, contentsList)
                }
              />
            </li>
          )}

          {filteredContentsList &&
            filteredContentsList.map((filter, inx, filterArr) => (
              <li key={`filter-${filter.filterId}-${inx}`}>
                <label
                  htmlFor={filter.filterId}
                  className={`flex items-center gap-x-4 cursor-pointer ${
                    inx === 0 ? "pb-4" : "py-4"
                  } ${
                    inx !== filterArr.length - 1
                      ? "border-b border-b-slate-200"
                      : ""
                  }`}
                >
                  {/* Icon */}
                  {filter.icon && filter.icon}

                  {/* Content */}
                  <div className="flex flex-1 justify-between items-center">
                    {filter.content}
                    <span className="text-xs text-[#1d1d1da3]">
                      {filterState[filter.filterId].foundResults}
                    </span>
                  </div>

                  <Checkbox
                    id={filter.filterId}
                    checked={filterState[filter.filterId].isActive}
                    sx={{
                      // color: "#173c62",
                      "&.Mui-checked": {
                        color: "#173c62",
                      },
                      "&.MuiCheckbox-root": {
                        padding: "0px !important",
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleFilterChange(event.target.checked, filter.filterId);
                    }}
                  />
                </label>
              </li>
            ))}
          {filteredContentsList && filteredContentsList.length <= 0 && (
            <li>
              <p className="pb-4 text-center text-[#1d1d1da3]">
                No result found
              </p>
            </li>
          )}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};
export default FilterAccordian;
