
export const FormDisplay = ({ formContent }) => (
    <>
        <h1> Name: {formContent.eventName.value}</h1>
        <h2> Date: {formContent.eventDateInput.value}</h2>
        <h2> Description: {formContent.eventDescription.value}</h2>
    </>
)