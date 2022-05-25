<template>
    <div class="grid grid-nogutter surface-section text-800">
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
                <span class="block text-6xl font-bold mb-1">Proveemos tecnología para tu crecimeinto</span>
                <div class="text-6xl text-primary font-bold mb-3">con las mejores marcas a tu alcance</div>
                <p class="mt-0 mb-4 text-700 line-height-3">Contamos con un catálogo extenso de productos tecnológicos de varias marcas líderes a nivel mundial</p>
                <router-link to="/products">
                    <Button label="Compra ahora" type="button" class="mr-3 p-button-raised"></Button>
                </router-link>
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Image" class="md:ml-auto block md:h-full" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
        </div>
    </div>
</template>
