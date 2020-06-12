import React from 'react'

export const Employee = ({match}:any) => {
    return (
        <div>
            <h3>employee</h3>
            {match.params.id}
        </div>
    )
}

export default Employee
