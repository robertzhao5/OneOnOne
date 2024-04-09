import React from 'react';

function AvailabilityList({ timeslots }) {
  // Helper to convert day index to day name
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Group timeslots by day
  const groupedByDay = timeslots.reduce((acc, slot) => {
    const dayName = dayNames[slot.day];
    if (!acc[dayName]) {
      acc[dayName] = [];
    }
    acc[dayName].push(slot);
    return acc;
  }, {});

  // Sort and merge consecutive timeslots for each day
  const sortedAndMergedByDay = Object.entries(groupedByDay).map(([day, slots]) => {
    // Sort slots by minTime
    const sortedSlots = slots.sort((a, b) => a.minTime.localeCompare(b.minTime));

    // Merge consecutive timeslots
    const mergedSlots = sortedSlots.reduce((acc, slot) => {
      if (acc.length === 0) {
        acc.push({ ...slot });
      } else {
        const lastSlot = acc[acc.length - 1];
        if (lastSlot.maxTime === slot.minTime) {
          lastSlot.maxTime = slot.maxTime; // Merge with last slot
        } else {
          acc.push({ ...slot }); // Start a new slot
        }
      }
      return acc;
    }, []);

    return { day, slots: mergedSlots };
  });

return (
    <div className="container mt-2 w-100">
      <h1 className="fw-bold fs-2 mb-3">Saved Availabilities</h1>
      <div className="row justify-content-center w-100">
        {sortedAndMergedByDay.map(({day, slots}) => (
            <div key={day} className="col-auto mb-4">
              <h3 className="text-primary-emphasis fw-bold">{day}</h3>
              <ul className="list-unstyled">
                {slots.map((slot, index) => (
                    <li className="mt-2 mb-2" key={index}>{`${slot.minTime} - ${slot.maxTime}`}</li>
                ))}
              </ul>
            </div>
        ))}
      </div>
    </div>
);

}

export default AvailabilityList;
