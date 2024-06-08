import './widgetLg.css'

export default function WidgetLg() {

    const Button = ({type}) =>{
        return <button className={'widgetLgButtton ' + type}>{type}</button>
    }
    return (
        <div className='widgetLg'>
            <h3 className="widgetLgTitle">Latest Transections</h3>
            <table className="widgetLgTable">
                <tbody>

                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/19560945/pexels-photo-19560945/free-photo-of-a-girl-with-long-hair-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Nimra Sadique</span>
                    </td>
                    <td className="widgetLgDate">2 June 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus"><Button type="Approved"/></td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/19560945/pexels-photo-19560945/free-photo-of-a-girl-with-long-hair-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Nimra Sadique</span>
                    </td>
                    <td className="widgetLgDate">2 June 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus"><Button type="Declined"/></td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/19560945/pexels-photo-19560945/free-photo-of-a-girl-with-long-hair-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" className="widgetLgImg" />
                        <span className="widgetLgName">Nimra Sadique</span>
                    </td>
                    <td className="widgetLgDate">2 June 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus"><Button type="Pending"/></td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                        <img src="https://images.pexels.com/photos/19560945/pexels-photo-19560945/free-photo-of-a-girl-with-long-hair-standing-by-a-window.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" 
                        className="widgetLgImg" />
                        <span className="widgetLgName">Nimra Sadique</span>
                    </td>
                    <td className="widgetLgDate">2 June 2021</td>
                    <td className="widgetLgAmount">$122.00</td>
                    <td className="widgetLgStatus"><Button type="Approved"/></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


