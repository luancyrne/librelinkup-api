const mockLoginResponse = {
    data: {
        status: 0,
        data: {
            authTicket: { token: 'mock-token' },
            user: { id: 'user-123' }
        }
    }
};

const mockConnectionsResponse = {
    data: {
        status: 0,
        data: [{
            id: 'connection-123',
            patientId: 'patient-123',
            country: 'BR',
            status: 2,
            firstName: 'John',
            lastName: 'Doe',
            targetLow: 70,
            targetHigh: 150,
            uom: 1,
            sensor: {
                deviceId: '',
                sn: 'sensor-123',
                a: 1739574800,
                w: 60,
                pt: 3,
                s: true,
                lj: false
            },
            alarmRules: {
                c: true,
                h: {},
                f: {},
                l: {},
                nd: {},
                p: 5,
                r: 5,
                std: {}
            },
            glucoseMeasurement: {
                FactoryTimestamp: '2/23/2025 6:13:54 AM',
                Timestamp: '2/23/2025 3:13:54 AM',
                type: 1,
                ValueInMgPerDl: 95,
                TrendArrow: 3,
                TrendMessage: null,
                MeasurementColor: 1,
                GlucoseUnits: 1,
                Value: 95,
                isHigh: false,
                isLow: false
            },
            glucoseItem: {
                FactoryTimestamp: '2/23/2025 6:13:54 AM',
                Timestamp: '2/23/2025 3:13:54 AM',
                type: 1,
                ValueInMgPerDl: 95,
                TrendArrow: 3,
                TrendMessage: null,
                MeasurementColor: 1,
                GlucoseUnits: 1,
                Value: 95,
                isHigh: false,
                isLow: false
            },
            glucoseAlarm: null,
            patientDevice: {
                did: 'device-123',
                dtid: 40066,
                v: '2.11.2',
                l: true,
                ll: 70,
                hl: 240,
                u: 1739864892,
                fixedLowAlarmValues: {},
                alarms: true,
                fixedLowThreshold: 0
            },
            created: 1739420455
        }]
    }
};

const mockGlucoseResponse = {
    data: {
        status: 0,
        data: {
            connection: {
                id: 'connection-123',
                patientId: 'patient-123',
                country: 'BR',
                status: 2,
                firstName: 'John',
                lastName: 'Doe',
                targetLow: 70,
                targetHigh: 150,
                uom: 1,
                sensor: {
                    deviceId: '',
                    sn: 'sensor-123',
                    a: 1739574800,
                    w: 60,
                    pt: 3,
                    s: true,
                    lj: false
                },
                alarmRules: {
                    c: true,
                    h: {},
                    f: {},
                    l: {},
                    nd: {},
                    p: 5,
                    r: 5,
                    std: {}
                },
                glucoseMeasurement: {
                    FactoryTimestamp: '2/23/2025 6:15:55 AM',
                    Timestamp: '2/23/2025 3:15:55 AM',
                    type: 1,
                    ValueInMgPerDl: 92,
                    TrendArrow: 3,
                    TrendMessage: null,
                    MeasurementColor: 1,
                    GlucoseUnits: 1,
                    Value: 92,
                    isHigh: false,
                    isLow: false
                },
                glucoseItem: {
                    FactoryTimestamp: '2/23/2025 6:15:55 AM',
                    Timestamp: '2/23/2025 3:15:55 AM',
                    type: 1,
                    ValueInMgPerDl: 92,
                    TrendArrow: 3,
                    TrendMessage: null,
                    MeasurementColor: 1,
                    GlucoseUnits: 1,
                    Value: 92,
                    isHigh: false,
                    isLow: false
                },
                glucoseAlarm: null,
                patientDevice: {
                    did: 'device-123',
                    dtid: 40066,
                    v: '2.11.2',
                    l: true,
                    ll: 70,
                    hl: 240,
                    u: 1739864892,
                    fixedLowAlarmValues: {},
                    alarms: true,
                    fixedLowThreshold: 70
                },
                created: 1739420455
            },
            activeSensors: [{
                sensor: {},
                device: {}
            }],
            graphData: [{
                FactoryTimestamp: '2/22/2025 6:28:02 PM',
                Timestamp: '2/22/2025 3:28:02 PM',
                type: 0,
                ValueInMgPerDl: 110,
                MeasurementColor: 1,
                GlucoseUnits: 1,
                Value: 110,
                isHigh: false,
                isLow: false
            }]
        }
    }
};

module.exports = {
    mockConnectionsResponse,
    mockGlucoseResponse,
    mockLoginResponse
}