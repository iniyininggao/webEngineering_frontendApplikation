import scooterJsonDataParse from "./main";

test('scooterJsonDataParse correctly parses JSON data and calls addNewMapsPosition', () => {
    const mockMap = {  };
    const mockJsonData = {
      features: [
        { 
          geometry: { coordinates: [0, 0] },
          properties: { ADRESSE: 'Mock Address', BEZIRK: 5, ANZ_SCOOTER: 10 }
        },
      ]
    };
  
    const addNewMapsPositionSpy = jest.spyOn(global, 'addNewMapsPosition');
  
    scooterJsonDataParse(mockJsonData, mockMap);
  
    expect(addNewMapsPositionSpy).toHaveBeenCalledTimes(mockJsonData.features.length);
  });
  
  test('scooterJsonDataParse shows alert when ScooterJsonData is null', () => {
    const mockMap = {  };
  
    const alertSpy = jest.spyOn(window, 'alert');
  
    scooterJsonDataParse(null, mockMap);
  
    expect(alertSpy).toHaveBeenCalled();
  });
  