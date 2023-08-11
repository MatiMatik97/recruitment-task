import React from 'react';
import './FilterForm.css';

import { useForm } from 'react-hook-form';

const FilterForm = ({ manufacturers = [], applyFilters }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        applyFilters(data.availability, data.manufacturer)
    }

    return (
        <div className='filterForm'>
            <h3 className='filterForm__title'>Filters:</h3>

            <form className='filterForm__form' onSubmit={handleSubmit(onSubmit)}>
                {/* AVAILABILITY */}
                <h4>Availability:</h4>
                <div className="filterForm__availabilityWrapper">
                    <label htmlFor="availability-field-all">
                        <input
                            className='filterForm__availabilityField'
                            {...register("availability")}
                            type="radio"
                            value="All"
                            id="availability-field-all"
                            defaultChecked={true}
                        />
                        All
                    </label>

                    <label htmlFor="availability-field-yes">
                        <input
                            className='filterForm__availabilityField'
                            {...register("availability")}
                            type="radio"
                            value="Yes"
                            id="availability-field-yes"
                        />
                        Available
                    </label>

                    <label htmlFor="availability-field-no">
                        <input
                            className='filterForm__availabilityField'
                            {...register("availability")}
                            type="radio"
                            value="No"
                            id="availability-field-no"
                        />
                        Unavailable
                    </label>
                </div>

                {/* MANUFACTURER */}
                <h4>Manufacturer:</h4>
                <div className="filterForm__manufacturerWrapper">
                    <label htmlFor="manufacturer-field-all">
                        <input
                            className='filterForm__manufacturerField'
                            {...register("manufacturer")}
                            type="checkbox"
                            value="All"
                            id="manufacturer-field-all"
                            defaultChecked={true}
                        />
                        All
                    </label>

                    {manufacturers.map((manufacturer) => {
                        const manufacturerField = `manufacturer-field-${manufacturer}`;

                        return <label htmlFor={manufacturerField} key={manufacturer}>
                            <input
                                className='filterForm__manufacturerField'
                                {...register("manufacturer")}
                                type="checkbox"
                                value={manufacturer}
                                id={manufacturerField}
                            />
                            {manufacturer}
                        </label>
                    })}
                </div>

                <input
                    className='filterForm__SubmitButton'
                    type="submit"
                    value="Filter"
                />
            </form>
        </div>
    );
};

export default FilterForm;
