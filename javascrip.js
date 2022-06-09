const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('templateFooter')
const fragment = document.createDocumentFragment();


document.addEventListener('click',e =>{
    // console.log(e.target.matches(".card .btn-primary"))
    if(e.target.matches(".card .btn-primary")){
        //console.log('ejeecutar agg')
        agregarAlCarrito(e)
    }

   // console.log(e.target.matches(".list-group-item .btn-success"))
   if(e.target.matches(".list-group-item .btn-success")){
       agregarFruta(e)
   }

   if(e.target.matches(".list-group-item .btn-danger")){
    disminuirFruta(e)
   }

   if (e.target.matches(" .finalizar")){
    finalizarCompra(e)
   }
  
})

let carritoCompras = [];

const agregarAlCarrito =(e)=>{
    //console.log(e.target.dataset.fruta);

    const producto ={
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad:1,
        precio:parseInt(e.target.dataset.precio)
    }
    const index=carritoCompras.findIndex(
        (item)=>item.id === producto.id
    );
    //console.log(index)

    if(index === -1){
        carritoCompras.push(producto);
    }else{
        carritoCompras[index].cantidad++;
        //carritoCompras[index].precio = carritoCompras[index].cantidad*producto.precio

    }
    console.log(carritoCompras);
    
    pintarCarrito();
    
};

const pintarCarrito = () =>{
    carrito.textContent='';
    carritoCompras.forEach((item) =>{
        const clone =template.content.cloneNode(true);
        clone.querySelector('.lead').textContent=item.titulo;
        clone.querySelector('.badge').textContent=item.cantidad;
        clone.querySelector('div .lead span').textContent=item.precio * item.cantidad;
        clone.querySelector('.btn-danger').dataset.id= item.id;
        clone.querySelector('.btn-success').dataset.id= item.id;

        fragment.appendChild(clone);
    })

    carrito.appendChild(fragment);

    pintarFooter();
};

const agregarFruta= (e)=>{
    console.log('me diste click',e.target.dataset.id);
    carritoCompras = carritoCompras.map((item) => {
        if(item.id === e.target.dataset.id){
            item.cantidad++;
        }
        return item;
    })

    pintarCarrito()
};

const disminuirFruta = (e)=>{
    console.log('disminuye precio')

    carritoCompras=carritoCompras.filter(item=>{
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad--
                if(item.cantidad === 0) return
                return item
            }
        }else{return item}
    })
    pintarCarrito()
};

const finalizarCompra =(e)=>{
    console.log('finalizar compra')  
        swal("Genial!", "Su compra a sido procesada", "success");
    
     
}

const pintarFooter = ()=>{
    footer.textContent="";

    const totalCompra = carritoCompras.reduce(
        (acc,current)=> acc + current.cantidad * current.precio, 0
        );
        
        const clone= templateFooter.content.cloneNode(true);
        clone.querySelector('span').textContent=totalCompra;
        footer.appendChild(clone);
    }