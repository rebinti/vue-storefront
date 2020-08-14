import rootStore from '@vue-storefront/core/store'

export default (index: number | string): string => {
    try {
        const sizeOption = rootStore.state.product.current.configurable_options
            .filter(v => v.attribute_code === "size")

        if(sizeOption.length < 1) {
            throw new Error("No size option")
        }

        index = Number(index)
        
        for(let size of sizeOption.values) {
            if(size.value_index === index) {
                return size.label
            }
        }

        throw new Error("Impossible size")
        
    } catch(e) {
        console.error("ERROR", e.message)
        return "Unknown"
    }
}