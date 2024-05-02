import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import "../assets/css/home.css";
export default function Home() {
  return (
    <div className="body">
      <CCard className="p-4 m-3">
        <CCardHeader>
          <span>Transactions for the last 7 days</span>
        </CCardHeader>
        <CCardBody>
          <section className="panel mt-3">
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-condensed mb-none">
                  <thead>
                    <tr>
                      <th className="text-center">Forms</th>
                      <th className="text-center">New</th>
                      <th className="text-center">For Review</th>
                      <th className="text-center">For Approval</th>
                      <th className="text-center">Approved</th>
                      <th className="text-center">Disapproved</th>
                      <th className="text-center">Returned</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"Raw Materials Scrapping"}</td>
                      <td>{}</td>
                      <td>{}</td>
                      <td className="text-center">{}</td>
                      <td className="text-center">{}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                    <tr>
                      <td>{"SubAssy Scrapping"}</td>
                      <td>{}</td>
                      <td>{}</td>
                      <td className="text-center">{}</td>
                      <td className="text-center">{}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                    <tr>
                      <td>{"Material Adjustment"}</td>
                      <td>{}</td>
                      <td>{}</td>
                      <td className="text-center">{}</td>
                      <td className="text-center">{}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </CCardBody>
      </CCard>
    </div>
  );
}
