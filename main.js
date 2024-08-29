var url = "bd/crud.php";

var appMoviles = new Vue({
    el: "#appMoviles",
    data: {
        moviles: [],
        marca:"",
        modelo:"",
        stock:"",
        total:0
    },
    methods: {
        //Botones
        btnAlta: async function(){
            const {value: formValues} = await Swal.fire({
                title:'NUEVO',
                html:'<div class="row"><label class="col-sm-3 col-form-label">Marca</label><div class="col-sm-7"><input id="marca" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" type="number" min="0" class="form-control"></div></div>',
                focusConfirm: false,
                showCancelButton:true,
                confirmButtonText: 'Guardar',
                confirmButtonColor:'#1cc88a',
                cancelButtonColor:'#3085d6',
                preConfirm: () => {
                    return [
                        this.marca = document.getElementById('marca').value,
                        this.modelo = document.getElementById('modelo').value,
                        this.stock = document.getElementById('stock').value
                    ]
                }
            })
            if (this.marca == "" || this.modelo == "" || this.stock == 0){
                Swal.fire({
                    icon: 'info',
                    title: 'Datos incompletos',
                })
            }
            else{
                this.altaMovil(); // Llamamos a la funcion para dar de alta al movil
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    icon: 'success',
                    title: '¡Producto agregado!'
                });
            }
        },
        btnEditar: async function(id, marca, modelo, stock){
            
            await Swal.fire({
                title:'EDITAR',
                html:'<div class="row"><label class="col-sm-3 col-form-label">Marca</label><div class="col-sm-7"><input id="marca" type="text" class="form-control" value="'+marca+'"></div></div><div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" type="text" class="form-control" value="'+modelo+'"></div></div><div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" type="number" min="0" class="form-control" value="'+stock+'"></div></div>',
                focusConfirm: false,
                showCancelButton:true,
            }).then((result) => {
                if (result.value){
                    // Capturamos los datos si es que se modifican 
                    marca = document.getElementById('marca').value,
                    modelo = document.getElementById('modelo').value,
                    stock = document.getElementById('stock').value

                    this.editarMovil(id, marca, modelo, stock);
                    Swal.fire(
                        '¡Actualizado!',
                        'El registro ha sido actualizado',
                        'success'
                    )
                }
            });            
        },
        btnBorrar: function(id){
            Swal.fire({
                title: '¿Esta seguro de borrar el registro: '+id+' ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.value){
                    this.borrarMovil(id);
                    Swal.fire(
                        '¡Eliminado!',
                        'El registro ha sido eliminado',
                        'success'
                    )
                }
                
            })
        },
        
        // Procedimiento listar
        listarMoviles: function(){
            axios.post(url, {opcion:4}).then(response => {
                this.moviles = response.data;
                console.log(this.moviles);
            });
        },
        // Procedimiento de crear
        altaMovil: function(){
            axios.post(url, {opcion:1, marca: this.marca, modelo: this.modelo, stock: this.stock}).then(response => {
               this.listarMoviles();
            });
            this.marca = "";
            this.modelo = "";
            this.stock = 0;
        },
        // Procedimiento de actualizar
        editarMovil: function(id, marca, modelo, stock) {
            axios.post(url, {opcion:2, id: id, marca: marca, modelo: modelo, stock: stock}).then(response => {
               this.listarMoviles();
            });        
        },
        //Borrar
        borrarMovil: function(id){
            axios.post(url, {opcion:3, id: id}).then(response => {
               this.listarMoviles(); 
            });                    
        }
    },
    created: function(){
        this.listarMoviles();
    },
    computed: {
        totalStock(){
            this.total = 0;
            for(movil of this.moviles){
                this.total = this.total + parseInt(movil.stock); 
            }
            return this.total;
        }
    }
})

