import React from 'react';

function Suggest(){
    return(<main>
        {/* <!--Side by side calendar comparison--> */}
        <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
            </div>


            <div class="calendar-group">
                <h2>your calendar</h2>
                
            </div>
            </div>

            {/* <!--        calendar detail modal--> */}
            <div
                    class="modal fade"
                    id="schedule-modal"
                    tabindex="-1"
                    role="dialog"
                    aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="schedule-modal-title"></h5>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
                            <button
                                    type="button"
                                    class="btn btn-secondary"
                            >
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
    </main>);
}
export default Suggest;
{

    /*
    
     <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script>
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('Invitation sent to your contacts!', 'success')
        })
    }
</script>
<script>
// <!--    for demo, probability trigger ok/not ok-->
document.getElementById("save").onclick = function () {
    const randomNumber=Math.random();
    if (randomNumber<0.5){
        const okAlert = document.getElementById("okToast");
            const bsAlert = new bootstrap.Toast(okAlert);
            bsAlert.show();
    }else {
        const okAlert = document.getElementById("notOKToast");
            const bsAlert = new bootstrap.Toast(okAlert);
            bsAlert.show();
    }
}

<!--    For future use, of/not ok toast-->
    // document.getElementById("okToastBtn").onclick = function () {
    //     const okAlert = document.getElementById("okToast");
    //     const bsAlert = new bootstrap.Toast(okAlert);
    //     bsAlert.show();
    // }
    //
    // document.getElementById("notOKToastBtn").onclick = function () {
    //     const okAlert = document.getElementById("notOKToast");
    //     const bsAlert = new bootstrap.Toast(okAlert);
    //     bsAlert.show();
    // }
</script> */}

//  {/* <!--For ok/not ok alert--> */}
//  <div class="toast-container position-fixed bottom-0 end-0 p-3">
//  <div id="okToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
//      <div class="toast-header">
//          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//               class="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
//              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
//          </svg>
//          <strong class="me-auto">Calendar</strong>
//          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//      </div>
//      <div class="toast-body">
//          Works for everyone! Meeting time Changed!
//      </div>
//  </div>
// </div>
// <div class="toast-container position-fixed bottom-0 end-0 p-3">
//  <div id="notOKToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
//      <div class="toast-header">
//          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//               class="bi bi-calendar2-x-fill" viewBox="0 0 16 16">
//              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5m-6.6 5.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z"/>
//          </svg>
//          <strong class="me-auto">Calendar</strong>
//          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//      </div>
//      <div class="toast-body">
//          Someone can't make it! Meeting time is unchanged.
//      </div>
//  </div>
// </div>
// </div>

// {/* <!--    End of ok/not ok alert--> */}

// {/* <!--   For event detail change --> */}
// <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
// <div class="modal-dialog">
//  <div class="modal-content">
//      <div class="modal-header">
//          <h1 class="modal-title fs-5" id="eventModalLabel">Event detail</h1>
//          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//      </div>
//      <div class="modal-body">
//          <h4>Meeting time</h4>
//          <h5>Starts:</h5>
//          <div class="cs-form">
//              <input type="time" class="form-control" value="10:05 AM" placeholder="2:00 PM">
//          </div>
//          <h5>Ends:</h5>
//          <div class="cs-form">
//              <input type="time" class="form-control" value="10:05 AM" placeholder="3:00 PM">
//          </div>
//          <h4>Show As</h4>
//          <div class="btn-group" role="group" aria-label="Avail-non avail selector">
//              <input type="radio" class="btn-check" name="btnradio" id="btnNonAvail" autocomplete="off"
//                     checked>
//              <label class="btn btn-danger" for="btnNonAvail">Busy</label>

//              <input type="radio" class="btn-check" name="btnradio" id="btnAvail" autocomplete="off">
//              <label class="btn btn-success" for="btnAvail">Free</label>
//          </div>
//          <h4>Participant</h4>
//          <div class="input-group mb-3">
//              <span class="input-group-text" id="basic-addon1">@</span>
//              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
//                     aria-describedby="basic-addon1">
//              <button class="btn btn-outline-primary" type="button" id="button-add">Add</button>
//          </div>
//          <ul class="list-group list-group-vertical">
//              <li class="list-group-item">Jennifer Xi
//                  <button type="button" class="btn-close"></button>
//              </li>
//              <li class="list-group-item">Ocean Chen
//                  <button type="button" class="btn-close"></button>
//              </li>
//              <li class="list-group-item">Robert Zhao
//                  <button type="button" class="btn-close"></button>
//              </li>
//              <li class="list-group-item">Kailas Moon
//                  <button type="button" class="btn-close"></button>
//              </li>
//          </ul>
//      </div>
//      <div class="modal-footer">
//          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="save">Save</button>
//      </div>
//  </div>
// </div>
// </div>


// {/* <!--    end of detail change--> */}

// {/* <!--    For select people to meet--> */}
// <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#peopleModal"
//  data-bs-whatever="" >
// Select people to meet
// </button>
// <div class="modal fade" id="peopleModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
// <div class="modal-dialog">
//  <div class="modal-content">
//      <div class="modal-header">
//          <h1 class="modal-title fs-5" id="peopleModalLabel">Event detail</h1>
//          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//      </div>
//      <div class="modal-body">
//          <h4>Participant</h4>
//          <div class="input-group mb-3">
//              <span class="input-group-text" id="peopleBasic-addon1">@</span>
//              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
//                     aria-describedby="basic-addon1">
//              <button class="btn btn-outline-primary" type="button" id="peopleButton-add">Add</button>
//          </div>
//          <ul class="list-group list-group-vertical">
//              <li class="list-group-item">
//                  <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox">
//                  <label class="form-check-label" for="firstCheckbox">Jennifer Xi</label>
//              </li>
//              <li class="list-group-item">
//                  <input class="form-check-input me-1" type="checkbox" value="" id="secondCheckbox">
//                  <label class="form-check-label" for="secondCheckbox">Ocean Chen</label>
//              </li>
//              <li class="list-group-item">
//                  <input class="form-check-input me-1" type="checkbox" value="" id="thirdCheckbox">
//                  <label class="form-check-label" for="thirdCheckbox">Robert Zhao</label>
//              </li>
//              <li class="list-group-item">
//                  <input class="form-check-input me-1" type="checkbox" value="" id="forthCheckbox">
//                  <label class="form-check-label" for="forthCheckbox">Kailas Moon</label>
//              </li>
//          </ul>
//      </div>
//      <div class="modal-footer">
//          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Confirm</button>
//      </div>
//  </div>
// </div>
// </div>