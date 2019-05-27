import React from "react"
import {Content, Text, View} from "native-base"
import {withLink} from "../../libs/withState"
import {Col, Grid} from 'react-native-easy-grid'
import {moderateScale} from "../../../scaling"
import {events, logEvent} from "../../../../events"


const sectionPageStyle = {
    sections: {
        backgroundColor: "rgba(63, 81, 181, 0.1)",
        justifyContent: "center"
    },

    sectionListItem: {
        padding: moderateScale(10),
        marginVertical: moderateScale(5)
    },

    activeSectionListItem: {
        backgroundColor: "#fff",
    },

    section: {
        padding: moderateScale(30)
    }
}

const Section = ({children}) => {
<<<<<<< HEAD
=======

    switch (children.length) {
        case 4:
            logEvent(events.change_tab_step_option)
            break
        case 1:
            logEvent(events.change_tab_try_option)
            break
        case 2:
            logEvent(events.change_tab_tip_option)
            break
    }
>>>>>>> pr/3
    return (
        <Content contentContainerStyle={sectionPageStyle.section}>
            {children}
        </Content>
    )
}
const _SectionPage =
    ({sections, renderField, config, activeSectionIdx, activeSectionIdxChange}) =>
        <Grid style={sectionPageStyle.container}>
            <Col style={sectionPageStyle.sections} size={30}>
                {sections.map((section, idx) => {
                    const isActive = activeSectionIdx === idx
                    return <View
                        style={[sectionPageStyle.sectionListItem, isActive && sectionPageStyle.activeSectionListItem]}
                        key={section.name}>
<<<<<<< HEAD
                        <Text style={{fontSize: moderateScale(12)}} onPress={() =>activeSectionIdxChange(idx)}>
=======
                        <Text style={{fontSize: moderateScale(12)}} onPress={() => activeSectionIdxChange(idx)}>
>>>>>>> pr/3
                            {section.name}
                        </Text>
                    </View>
                })
                }
            </Col>
            <Col style={{justifyContent: "center"}} size={70}>
                <Section>
                    {sections[activeSectionIdx].fields.map(renderField)}
                </Section>
            </Col>
        </Grid>


<<<<<<< HEAD
export const SectionPage = withLink("activeSectionIdx", 0)(_SectionPage);
=======
export const SectionPage = withLink("activeSectionIdx", 0)(_SectionPage)
>>>>>>> pr/3

