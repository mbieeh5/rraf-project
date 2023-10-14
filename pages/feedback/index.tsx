import Page from "components/Page"
import FormSection from "views/ContactPage/FormSection"
import InformationSection from "views/ContactPage/InformationSection"


export default function Feedback() {
    return(
        <Page
        title="Feedback"
        description="If you find bug or unwanted content just contact me down below"
        >
        <InformationSection />
        <FormSection />
        </Page>
    )
}