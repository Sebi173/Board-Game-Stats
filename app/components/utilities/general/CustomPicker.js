import {Picker} from '@react-native-picker/picker';

const CustomPicker = () => {

    let [selectedLanguage, setSelectedLanguage] = useState('Java');

    return( 
        <View>
            <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue) =>
                    setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    )
}

export default CustomPicker;