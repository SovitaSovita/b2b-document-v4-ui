function Page() {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Document Name</th>
                            <th>Document Number</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Department</th>
                            <th>Creation date and time</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>Purple</td>
                            <td>Purple</td>
                            <td>Purple</td>
                            <td>Purple</td>
                            <td>Purple</td>
                            <td>Purple</td>
                            <td>Purple</td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Page