import DisplayProduct from "./DisplayProduct";

const DisplayListProduct = ({ products }) => {
    return (
        <div
            style={{ padding: "30px", minHeight: "700px" }}
            className="bg-slate-50 p-10 rounded-[18px] shadow-lg min-w-[1200px] my-10 mx-auto">
            <h2 className="text-[2.2rem] font-bold text-[#22223b] mb-8 text-center tracking-wide">
                List Products
            </h2>
            {products.length === 0 && (
                <h1 style={{ textAlign: "center", fontSize: "40px", marginTop: "210px" }}>
                    No products to display
                </h1>
            )}

            <div className="flex flex-wrap gap-8 justify-center px-3">
                {products.slice(0, 3).map((product, idx) => (
                    <DisplayProduct
                        key={product.productId || idx}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        productId={product.productId}
                        imageLink={product.imageLink}
                    />
                ))}
            </div>

            <div className="flex flex-wrap gap-8 justify-center px-3 mt-8">
                {products.slice(3, 6).map((product, idx) => (
                    <DisplayProduct
                        key={product.productId || idx}
                        productName={product.productName}
                        productPrice={product.productPrice}
                        productId={product.productId}
                        imageLink={product.imageLink}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayListProduct;
