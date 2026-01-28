import { AuthProvider, DataProvider } from './contexts';
import BengkelMotorApp from './components/BengkelMotorApp';

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen">
          <BengkelMotorApp />
        </div>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;