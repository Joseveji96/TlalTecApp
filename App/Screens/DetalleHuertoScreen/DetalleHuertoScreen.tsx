import { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import COLORS from '../../Constants/Color';
import DetalleHuertoTabs from './components/DetalleHuertoTabs';
import HuertoCard from '../../../src/components/HuertoCard';
import BackButton from '../../../src/components/BackButton';
import IconButton from '../../../src/components/IcoBottonTL';

export default function DetalleHuertoScreen({ navigation, route }) {
	const { huerto } = route.params;
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={styles.Container}>
			<View style={{marginHorizontal: 22, marginBottom: 30}}>
				<View style={{ marginTop: 46, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
					<BackButton onPress={() => {navigation.goBack()}} />
					<Text style={{ fontFamily: "Poppins_700Bold", fontSize: 32, color: COLORS.dark}}>
						TlalTec
					</Text>
					<IconButton onPress={()=>console.log("Hola")} iconSource={require("../../../src/assets/icons/setting-2.png")} iconSize={24} />
				</View>
				<HuertoCard
					imageTemp={require("../../../src/assets/icons/humedad.png")}
					imageHmdd={require("../../../src/assets/icons/termometro.png")}
					imageHuerto={require("../../../src/assets/images/Fondo.png")}
					huerto={huerto}
				/>
				
			</View>

			{/* </ScrollView> */}

			<View style={{ height: 2, backgroundColor: COLORS.gray }}></View>

			<DetalleHuertoTabs route={{ params: { huerto } }}/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'column',
		backgroundColor: "white",
	},
	ContainerBackground: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: "#F8F8F8",
		borderRadius: 12,
		marginTop: 10,
	},
	textAlt: {
		fontSize: 14,
		fontFamily: "Poppins_600SemiBold",
		marginLeft: 10,
		marginBottom: 16,
		marginTop: 24,
		color: COLORS.gray3
	},
	logIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 83,
		height: 44,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.gray2,

	},
	checkboxContainer: {
		flexDirection: 'row',
		marginBottom: 8,
	},
	checkbox: {
		alignSelf: 'center',
	},
	label: {
		margin: 8,
	},
	innerContainer: {
		backgroundColor: 'lightblue',
		padding: 20,
		borderRadius: 10,
	},
	rightText: {
		color: '#000', // Cambia el color según tu diseño
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
	},
	modalContent: {
		width: '90%', // Ajustar el tamaño del modal según tu preferencia
		height: '90%',
		backgroundColor: '#fff',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
})