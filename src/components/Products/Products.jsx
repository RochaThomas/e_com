import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './Product/Product';

const products = [
    { id: 1, name: 'Shoes', description: 'Running shoes', price: '$5', image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.insider.com%2F62f560e3f6815900188f21b5%3Fwidth%3D700&tbnid=q7UWrsfQfA8HxM&vet=12ahUKEwiC05WRzYyAAxUOoIQIHSvfB84QMygMegUIARCzAw..i&imgrefurl=https%3A%2F%2Fwww.insider.com%2Fguides%2Fhealth%2Ffitness%2Fbest-cheap-running-shoes&docid=OEg-F30kkN_qpM&w=700&h=525&q=running%20shoes&ved=2ahUKEwiC05WRzYyAAxUOoIQIHSvfB84QMygMegUIARCzAw'},
    { id: 2, name: 'Macbook', description: 'Apple Macbook', price: '$10', image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Freviewed-com-res.cloudinary.com%2Fimage%2Ffetch%2Fs--pM3BRbA_--%2Fb_white%2Cc_limit%2Ccs_srgb%2Cf_auto%2Cfl_progressive.strip_profile%2Cg_center%2Ch_668%2Cq_auto%2Cw_1187%2Fhttps%3A%2F%2Freviewed-production.s3.amazonaws.com%2F1607081088000%2FDSC_0877.jpg&tbnid=iPrk1-y31t1XRM&vet=12ahUKEwjlheXBzYyAAxXbsoQIHbpEDq0QMygJegUIARD9Ag..i&imgrefurl=https%3A%2F%2Freviewed.usatoday.com%2Flaptops%2Fcontent%2Fapple-m1-macbook-air-2020-review&docid=aRIclZk1qYNEMM&w=1187&h=667&q=apple%20macbook&ved=2ahUKEwjlheXBzYyAAxXbsoQIHbpEDq0QMygJegUIARD9Ag'},
]

const Products = () => {
    return (
        <main>
            <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product}/>
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;