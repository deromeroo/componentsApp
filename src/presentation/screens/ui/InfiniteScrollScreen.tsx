
import { useContext, useState } from "react"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import { FadeInImage } from "../../components/ui/FadeInImage"
import { ThemeContext } from "../../context/ThemeContext"

export const InfiniteScrollScreen = () => {

    const {colors} = useContext(ThemeContext)
  

    const [numbers, setNumbers] = useState([0,1,2,3,4,5])

    const loadMore = () => {
        const newArray = Array.from( {length: 5}, (_, i) => numbers.length + i )
        setNumbers([...numbers, ...newArray])
    }

  return (
    <View style={{ backgroundColor: 'black' }}>
        <FlatList 
            data={ numbers }
            onEndReached={ loadMore }
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={ 0.6 }
            keyExtractor={ (item) => item.toString() }

            renderItem={ ({ item }) => <ListItem number={ item } /> }

            ListFooterComponent={ () => (
                <View style={{ height: 150, justifyContent: 'center'}}>
                    <ActivityIndicator size={ 40 } color={colors.primary}/>
                </View>
            )}
        />
    </View>
  )
}

interface ListItemProps {
    number: number
}


const ListItem = ({number}: ListItemProps) => {
    return (

        <FadeInImage 
            uri={`https://picsum.photos/id/${number}/500/400`}
            style={{
                height: 400,
                width: '100%'
            }}
        />

        // <Image 
        //     source={{ uri: `https://picsum.photos/id/${number}/500/400`}}
        //     style={{
        //         height: 400,
        //         width: '100%'
        //     }}
        // />
    )
}
