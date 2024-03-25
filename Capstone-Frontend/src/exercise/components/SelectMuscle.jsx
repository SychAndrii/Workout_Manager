import { useEffect, useState, useRef } from "react";
import Select from 'react-select';
import useIdToken from "@/src/auth/hooks/useIdToken";


export function SelectMuscle({ collectionState, setCurrentCollection, placeholder }) {

    const [muscleOptions, setMusclesOptions] = useState();
    const initialCollectionRef = useRef(collectionState);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [previouslySelectedMuscleLength, setPreviouslySelectedMuscleLength] = useState(0);


    const token = useIdToken();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}api/muscle`;
    // retireve the muscle groups from the backend
    useEffect(() => {
        async function fetchData() {

            const res = await fetch(url, {
                headers: new Headers({
                    Authorization: `Bearer ${token}`,
                }),
            });

            const data = await res.json();

            const formattedData = data.map(muscle => ({ label: muscle, value: muscle }));
            setMusclesOptions(formattedData);
        }

        if (token) fetchData();
    }, [token]);

    // render based on selected change
    useEffect(() => {
        handleSelectChange(selectedMuscle);
    }, [selectedMuscle]);

    const handlechange = (value) => {
        const values = value.map((v) => v.value);
        setSelectedMuscle(values);
    };

    const handleSelectChange = (muscles) => {
        if (!muscles || muscles.length === 0) {
            setCurrentCollection(initialCollectionRef.current);
            setPreviouslySelectedMuscleLength(0);
            return;
        }

        let searchList = muscles.length > previouslySelectedMuscleLength ? collectionState : initialCollectionRef.current;
        setPreviouslySelectedMuscleLength(muscles.length);

        // Filter exercises that contain all selected muscles in either primary or secondary muscle groups.
        const filteredExercises = searchList.filter(exercise => {
            // Check if all selected muscles are included in the exercise's primary or secondary muscle arrays.
            const allMusclesMatch = muscles.every(muscle =>
                exercise.primaryMuscles.includes(muscle) || exercise.secondaryMuscles.includes(muscle)
            );
            return allMusclesMatch;
        });


        const primaryMatches = [];
        const secondaryMatches = [];

        // Sort by primary matches first and then secondary matches
        filteredExercises.forEach((item) => {
            const primaryMatch = item.primaryMuscles.some(muscle => muscles.includes(muscle)); // atleast one match in primary
            const secondaryMatch = item.secondaryMuscles.some(muscle => muscles.includes(muscle)); // atleast one match in secondary

            if (primaryMatch) {
                primaryMatches.push(item);
            } else if (secondaryMatch) {
                secondaryMatches.push(item);
            }
        });

        setCurrentCollection([...primaryMatches, ...secondaryMatches]);
    }


    return (
        <Select
            className="w-64"
            onChange={handlechange}
            placeholder={placeholder}
            options={muscleOptions}
            isClearable={true}
            isMulti={true}
            isSearchable={true}
            closeMenuOnScroll={true}
        />
    )
}

