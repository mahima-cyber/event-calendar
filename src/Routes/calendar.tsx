import React, { useState, useRef, useEffect } from "react";
// import "@fullcalendar/common";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { nanoid } from "nanoid";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "../custom.css";
import events from "../event";
import CustomModal from "../component/Modals/customModal";

let todayStr = new Date().toISOString().replace(/T.*$/, "");

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [localStorageData, setLocalStorageData] = useState<any>('')
  const calendarRef = useRef<any>(null);
  const [data, setData] = React.useState("");
  const [title, setTitle] = useState<any>("");
  const [start, setStart] = useState<any>(new Date());
  const [end, setEnd] = useState<any>(new Date());
  const [datas, setDatas] = React.useState<any>([]);
  const [eventData, setEventData] = useState<any>([]);

  useEffect(() => {
    const localStorageOptions = localStorage.getItem("selectedValue");
    if (localStorageOptions) {
      const parsedOptions = JSON.parse(localStorageOptions);
      console.log(888, parsedOptions);
      if (parsedOptions !== localStorageData) {
        setLocalStorageData(parsedOptions);
      }
    }
  }, []);


  useEffect(() => {
    const localStorageData = localStorage.getItem("events");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setEventData(parsedData);
    }
  }, []);

  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };
  function handleDateClick(arg: any) {
    console.log(arg)
  }

  function handleDateSelect(selectInfo: any) {
    if (
      selectInfo.view.type === "timeGridWeek" ||
      selectInfo.view.type === "dayGridMonth"
    ) {
      selectInfo.view.calendar.unselect();
      setState({ selectInfo, state: "create" });
      // Open modal create
      console.log("open modal create");
      setStart(selectInfo.start);
      setEnd(selectInfo.end);
      setModal(true);
    }
  }
  function renderEventContent(eventInfo: any) {
    return (
      <div>
        <i
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          Event:{eventInfo.event.title}
        </i><br />
      </div>
    );
  }
  function handleEventClick(clickInfo: any) {
    // console.log("open modal update, delete");
    setState({ clickInfo, state: "update" });
    // set detail
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    setEnd(clickInfo.event.end);
    setModal(true);
  }
  function handleEvents(events: any) {
    setCurrentEvents(events);
  }
  function handleEventDrop(checkInfo: any) {
    // console.log(checkInfo.event.start.toISOString());
    // checkInfo.revert();
    setState({ checkInfo, state: "drop" });
    setConfirmModal(true);
  }
  function handleEventResize(checkInfo: any) {
    // console.log(checkInfo);
    setState({ checkInfo, state: "resize" });
    setConfirmModal(true);
  }
  function handleEdit() {
    // console.log(start, end);
    // state.clickInfo.event.setAllDay(true);

    state.clickInfo.event.setStart(start);
    state.clickInfo.event.setEnd(end);
    state.clickInfo.event.mutate({
      standardProps: { title }
    });
    handleClose();
  }
  function handleSubmit() {

    const newEvent = {
      id: nanoid(),
      title,
      start: start.toISOString(),
      end: state.selectInfo?.endStr || end.toISOString(),
      allDay: state.selectInfo?.allDay || false,
      name: localStorageData.name
    };
    const existingData = localStorage.getItem("events");
    const eventData = existingData ? JSON.parse(existingData) : [];
    eventData.push(newEvent);
    const updatedData = JSON.stringify(eventData);
    localStorage.setItem("events", updatedData);
    console.log(4444, newEvent);
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);
    handleClose();
  }
  function handleDelete() {
    state.clickInfo.event.remove();
    handleClose();
  }
  function handleClose() {
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setState({});
    setModal(false);
  }
  const [state, setState] = useState<any>({});

  return (
    <div style={{ width: '100%' }}>
      <Row style={{ marginBottom: 20 }}>
        <Col
          sm={{ size: 3, offset: 6 }}
          md={{ size: 3, offset: 6 }}
          style={{
            paddingRight: 15
          }}
        >
          <Button
            style={{ float: "right" }}
            color="secondary"
            onClick={() => setModal(true)}
          >
            Add schedule
          </Button>
        </Col>
      </Row>
      {/* <Row> */}
      {/* <Col md={12}> */}
      <div className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            // left: "myCustomButton prev,today,next",
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          buttonText={{
            today: "current",
            month: "month",
            week: "week",
            day: "day",
            list: "list"
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={eventData.map((event: any) => ({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end
          }))} 
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          dateClick={handleDateClick}
          eventAdd={(e: any) => {
            console.log("eventAdd", e);
          }}
          eventChange={(e: any) => {
            const data = localStorage.getItem("events")
            console.log(7777, data)
            // data.filter((el)=>el.id)
            // {data?.map((el:any)=>{
            //   if(el.id===e.event._def.publicId){
            //     return{
            //       ...el,
            //       id:
            //       name:e.event._def.title
            //     }
            //   }
            //   else{
            //     return el
            //   }
            // })}
            console.log("eventChange", e.event._def);
          }}
          eventRemove={(e: any) => {
            console.log("eventRemove", e);
          }}
        />
      </div>
      <CustomModal
        title={state.state === "update" ? "Update Event" : "Add Event"}
        isOpen={modal}
        setData={setData}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={state.clickInfo ? handleEdit : handleSubmit}
        submitText={state.clickInfo ? "Update" : "Save"}
        onDelete={state.clickInfo && handleDelete}
        deleteText="Delete"
      >
        <FormGroup>
          <Label for="exampleEmail">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="with a placeholder"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">From - End</Label>
          <div style={{ height: '250px', overflow: 'auto'}}>
            <DateRangePicker
              initialSettings={{
                locale: {
                  format: 'M/DD hh:mm A'
                },
                startDate: start,
                endDate: end,
                timePicker: true
              }}
              onApply={(event, picker) => {
                setStart(new Date(picker.startDate));
                setEnd(new Date(picker.endDate));
              }}
            >
              <input className="form-control" type="text" />
            </DateRangePicker>
          </div>
        </FormGroup>
      </CustomModal>

      <CustomModal
        title={state.state === "resize" ? "Resize Event" : "Drop Event"}
        isOpen={confirmModal}
        toggle={() => {
          state.checkInfo.revert();
          setConfirmModal(false);
        }}
        onCancel={() => {
          state.checkInfo.revert();
          setConfirmModal(false);
        }}
        cancelText="Cancel"
        onSubmit={() => setConfirmModal(false)}
        submitText={"OK"}
      >
        Do you want to {state.state} this event?
      </CustomModal>
    </div>
  );
}
