/**
 * Datos mock del usuario/alumno actualmente logueado.
 * Simula la información que vendría del backend.
 */

export interface EnrollmentStep {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    date?: string;
}

export interface UserData {
    matricula: string;
    name: string;
    email: string;
    career: string;
    semester: number;
    avatar: string;
    enrollmentStatus: 'pendiente' | 'en_proceso' | 'completado' | 'rechazado';
    paymentVerified: boolean;
    progress: number; // 0-100
    enrollmentSteps: EnrollmentStep[];
}

export const MOCK_USER: UserData = {
    matricula: '20230145',
    name: 'Ana María González',
    email: 'ana.gonzalez@universidad.edu.mx',
    career: 'Ingeniería en Sistemas Computacionales',
    semester: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    enrollmentStatus: 'en_proceso',
    paymentVerified: true,
    progress: 65,
    enrollmentSteps: [
        {
            id: '1',
            title: 'Solicitud enviada',
            description: 'Tu solicitud de reinscripción fue recibida correctamente.',
            completed: true,
            date: '15 Feb 2026',
        },
        {
            id: '2',
            title: 'Documentación verificada',
            description: 'Tus documentos han sido revisados y aprobados.',
            completed: true,
            date: '18 Feb 2026',
        },
        {
            id: '3',
            title: 'Pago registrado',
            description: 'Se verificó tu comprobante de pago.',
            completed: true,
            date: '20 Feb 2026',
        },
        {
            id: '4',
            title: 'Asignación de grupo',
            description: 'Esperando asignación de grupo y horario.',
            completed: false,
        },
        {
            id: '5',
            title: 'Inscripción confirmada',
            description: 'Recibirás tu horario y credencial digital.',
            completed: false,
        },
    ],
};
