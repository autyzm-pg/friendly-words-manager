import React from "react"
import {View, Text} from "native-base"
import {withLink} from "../../libs/withState"
import { Col, Row, Grid } from 'react-native-easy-grid';
import {ScrollView} from "react-native"

const sectionPageStyle = {
	sections: {
		backgroundColor: "#e0e0e0",
		justifyContent: "center"
	},

	sectionListItem: {
		padding: 25,
		marginVertical: 10
	},

	activeSectionListItem: {
		backgroundColor: "#fff"
	},

	section: {
		paddingHorizontal: 120
	}
}

const Section = ({children}) => (
	<ScrollView style={sectionPageStyle.section}>
		{children}
	</ScrollView>
)

const _SectionPage =
		({sections, renderField, config, activeSectionIdx, activeSectionIdxChange}) =>
			<Grid style={sectionPageStyle.container}>
				<Col style={sectionPageStyle.sections} size={30}>
					<ScrollView>
					{sections.map((section, idx) =>
						<View style={[sectionPageStyle.sectionListItem, activeSectionIdx === idx && sectionPageStyle.activeSectionListItem]} key={section.name}>
							<Text style={{fontSize: 20}} onPress={() => activeSectionIdxChange(idx)}>{section.name}</Text>
						</View>)}
					</ScrollView>
				</Col>
				<Col style={{justifyContent: "center"}} size={70}>
					<Section>
						{sections[activeSectionIdx].fields.map(renderField)}
					</Section>
				</Col>
			</Grid>


export const SectionPage = withLink("activeSectionIdx", 0)(_SectionPage);