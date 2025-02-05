import { NextRequest, NextResponse } from 'next/server';
let products = [
    { name: "Trenton modular sofa_3", price: 25000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["sofa","trenton"],  width: 750, height: 384, image: "/Trenton modular sofa_3 1.png", rating: 4.5, stockQuantity: 50, id: 1,},
    { name: "Granite dining table with dining chair", price: 25000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Granite","dining","table"],  width: 750, height: 384, image: "/Granite dining table with dining chair 1.png", rating: 4.5, stockQuantity: 50, id: 2,},
    { name: "Outdoor bar table and stool", price: 25000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["table","Outdoor","stool"],  width: 750, height: 384, image: "/Outdoor bar table and stool 1.png", rating: 4.5, stockQuantity: 50, id: 3,},
    { name: "Plain console with teak mirror", price: 25000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Plain console","teak mirror"],  width: 750, height: 384, image: "/Plain console with teak mirror 1.png", rating: 4.5, stockQuantity: 50, id: 4,},
    { name: "Grain coffee table", price: 258200.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Grain", "coffee","table"],  width: 750, height: 384, image: "/Grain coffee table 1.png", rating: 4.5, stockQuantity: 50, id: 5,},
    { name: "Kent coffee table", price: 20000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Kent","coffee", "table"],  width: 750, height: 384, image: "/Kent coffee table 1.png", rating: 4.5, stockQuantity: 50, id: 6,},
    { name: "Round coffee table_color 2", price: 200000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Round","table","coffee"],  width: 750, height: 384, image: "/Round coffee table_color 2 1.png", rating: 4.5, stockQuantity: 50, id: 7,},
    { name: "Reclaimed teak coffee table", price: 100000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Reclaimed teak","table", "coffee"],  width: 750, height: 384, image: "/Reclaimed teak coffee table 1.png", rating: 4.5, stockQuantity: 50, id: 8, },
    { name: "Plain console_", price: 258200.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Plain","console_"],  width: 750, height: 384, image: "/Plain console_ 1.png",  rating: 4.5, stockQuantity: 50, id: 9, },
    { name: "Reclaimed teak Sideboard", price: 20000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Reclaimed teak","Sideboard"],  width: 750, height: 384, image: "/Reclaimed teak Sideboard 1.png",  rating: 4.5, stockQuantity: 50, id: 10, },
    { name: "SJP_0825 ", price: 200000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["SJP","sofa"],  width: 750, height: 384, image: "/SJP_0825  1.png",  rating: 4.5, stockQuantity: 50, id: 11, },
    { name: "Bella chair and table", price: 100000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Bella","table", "chair"],  width: 750, height: 384, image: "/Bella chair and table 1.png",  rating: 4.5, stockQuantity: 50, id: 12, },
    { name: "Granite square side table", price: 258800.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Granite","side table", "square"],  width: 750, height: 384, image: "/Granite square side table 2.png",  rating: 4.5, stockQuantity: 50, id: 13, },
    { name: "Asgaard sofa", price: 250000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["Asgaard","sofa"],  width: 750, height: 384, image: "/Asgaard sofa 2.png",  rating: 4.5, stockQuantity: 50, id: 14, },
    { name: "Maya sofa three seater", price: 115000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["sofa","Maya", "three seater"],  width: 750, height: 384, image: "/Maya sofa three seater 1.png",  rating: 4.5, stockQuantity: 50, id: 15, },
    { name: "Outdoor sofa set", price: 244000.00, description: "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.", tags: ["sofa","Outdoor set"],  width: 750, height: 384, image: "/Outdoor sofa set 1.png",  rating: 4.5, stockQuantity: 50, id: 16, }
];

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const productsId = parseInt(id, 10);
    const product = products.find((p) => p.id === productsId);

    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
}



export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    let updatedProduct = await request.json();
    const { id } = await context.params;
    const productsId = parseInt(id, 10);


    const productIndex = products.findIndex((p) => p.id === productsId);

    if (productIndex === -1) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    products[productIndex] = {
        ...products[productIndex], 
        ...updatedProduct, 
        id: productsId 
    };

    return NextResponse.json({ result: products[productIndex], success: true }, { status: 200 });
}