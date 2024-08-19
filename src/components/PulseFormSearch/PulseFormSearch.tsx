import React, {useEffect, useState} from "react";
import {PulseFormInput, PulseFormInputProps,} from "../PulseFormInput/PulseFormInput";
import "./PulseFormSearch.scss";
import useDebounce from "../useDebounce";


export interface Member {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
}

export interface PulseFormSearchProps extends PulseFormInputProps {
    allMembers: Member[];
    theme: string;
}


const PulseFormSearch: React.FC<PulseFormSearchProps> = ({
                                                             inputData,
                                                             inputValue = [],
                                                             onChange,
                                                             allMembers,
                                                             theme,
                                                         }) => {
    const [memberSearch, setMemberSearch] = useState("");
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
    const debouncedMembers = useDebounce(memberSearch, 700);

    useEffect(() => {
        if (debouncedMembers.trim() !== "") {
            const filter = allMembers.filter((member: Member) => {
                return (
                    (member.firstName
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase()) ||
                        member.lastName
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase()) ||
                        member.userName
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase()) ||
                        member.email
                            .toLowerCase()
                            .includes(debouncedMembers.toLowerCase())) &&
                    !inputValue.some(
                        (inputValue: { userName: string }) =>
                            inputValue.userName === member.userName,
                    )
                );
            });
            setFilteredMembers(filter);
        } else {
            setFilteredMembers([]);
        }
    }, [debouncedMembers, allMembers, inputValue]);

    const handleAddMember = (member: Member) => {
        inputValue = [...inputValue, member];
        onChange({target: {value: inputValue, name: "members"}});
        setFilteredMembers([]);
        setMemberSearch("");
    };

    const handleRemoveMember = (userName: string) => {
        inputValue = inputValue.filter(
            (member: Member) => member.userName !== userName,
        );
        onChange({target: {value: inputValue, name: "members"}});
    };

    return (
        <div className="project-pop__search-container">
            <div className="project-pop__user-add">
                <PulseFormInput
                    inputData={inputData}
                    inputValue={memberSearch}
                    onChange={e => setMemberSearch(e.target.value)}
                />
                {filteredMembers.length > 0 && (
                    <div className="project-pop__user-list">
                        {filteredMembers.map((member: Member, index: number) => (
                            <div key={index} className="project-pop__user-item">
                                <div
                                    className="project-pop__select-button"
                                    onClick={() => handleAddMember(member)}>
                  <span>
                    {member.firstName} {member.lastName}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={`project-pop__selected-members ${theme}`}>
                {inputValue?.length > 0 ? (
                    <div className="project-pop__selected-list">
                        {inputValue.map((member: Member, index: number) => (
                            <div key={index} className="project-pop__selected-member">
                <span>
                  {member.firstName} {member.lastName}
                </span>
                                <button
                                    type="button"
                                    className="project-pop__delete-button"
                                    onClick={() => handleRemoveMember(member.userName)}>
                                    &#x232B;
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No selected members</p>
                )}
            </div>
            <div className="delimiter"></div>
        </div>
    );
};

export default PulseFormSearch