let array = [
    {"name": "May", id: 1 },
    {"name" : "BM", id: 2},
    {"name":"Pikachu", id: 3}
]
let ppp0 = ""
let new_filter = array.filter((item)=>{
    // ppp0 += item.name
    // return item

    //delete
    // if(item.name === "May"){
    //     return
    // }
    // return item

    //delete2
    if(item.name !== "May"){
        return item
    }

})

let react_filter = [] //state
const rrr = (id)=>{
    const new_filter = array.filter((item)=>{
        if(item.id == id) {return}
        return item.id
    })
    react_filter = new_filter
}
rrr(2)
console.log("react_filter: ", react_filter)

// console.log("ppp0:", ppp0)
// console.log("new_filter: ", new_filter)

let ppp1 = false
let new_map = array.map((item)=>{
    // if(item.name =="May"){
    //     ppp1 = true
    // }
    return {item, "hh":"vv"}
})

console.log("ppp1:", ppp1)
console.log("new_map: ", new_map)


// 콜백함수, 배열을 차례로 순회, 아이템에 0번째인덱스부터 담고 로직을 처리해 나간다.
// 배열의 "크기","값"를 무조건 반환한다. "값"이 있든 말든

let for_new_map = []
for (let i=0; i<array.length; i++){
        // console.log("map의for_new_map",for_new_map)
        // console.log("map의어레이", array[i])
        for_new_map[i] = array[i]
}
// console.log("map의for_new_map11", for_new_map)

let for_new_map2 = []
for (let i=0; i<array.length; i++){
    if(array[i].name=="May"){
        for_new_map[i] = array[i]
    }
}

let ppp2 = false
let new_foreach = array.forEach((item)=>{
    if (item.name == "May"){
    ppp2 = true
}
    // return item
})

console.log("ppp2: ", ppp2)
console.log("new_foreach: ", new_foreach)

for (let i=0; i<array.length; i++){
    array[i]
}
// console.log(new_filter) //search
// console.log(new_map) //전체
// console.log(new_foreach)



// const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
//     const rrr = ()=>{
//       let tag = []
//       for(let i=0; i < header.length; i++){
//         tag.push(<th key={i}>{header[i]}</th>);
//       } 
//       console.log(tag)
//       return tag
//     };
//     return (
//       <div className="overflow-x">
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               {/* {header.map((title, index) => (
//                 <th key={index}>{title}</th>
//               ))} */}
//               {rrr()}
//             </tr>
//           </thead>