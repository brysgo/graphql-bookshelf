jest.autoMockOff();

import co from 'co';
function useGeneratorsWith(pit) {
  return (msg, fn) => pit(msg, co.wrap(fn))
}
// Use generators by default
it = useGeneratorsWith(pit);

