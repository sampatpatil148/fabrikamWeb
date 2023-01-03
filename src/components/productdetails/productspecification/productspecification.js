import React from 'react';


function ProductSpecification() {
    return (
        <div className="product-specification">
            <h2 suppressContentEditableWarning={true}>Product specifications</h2>
            <table className="p-specification-table table-striped table-bordered">
                <tbody>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Closure Type</span></th>
                        <td><span>Button</span></td>
                    </tr>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Collection</span></th>
                        <td><span>Casual</span></td></tr>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Dress type</span></th>
                        <td><span>Mini</span></td>
                    </tr>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Fabric</span></th>
                        <td><span>Polyester</span></td>
                    </tr>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Fit type</span></th>
                        <td><span>Regular</span></td>
                    </tr>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Neck</span></th>
                        <td><span>Open</span></td>
                    </tr>
                    <tr className="p-specification-t-row">
                        <th scope="row"><span>Brand</span>
                        </th>
                        <td><span>Wide World Importers</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductSpecification;