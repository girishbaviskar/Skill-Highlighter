document.addEventListener('DOMContentLoaded', () => {
  const toggleExtension = document.getElementById('toggleExtension');
  const statusText = document.getElementById('status');
  const skillsCount = document.getElementById('skillsCount');
  const manageSkillsBtn = document.getElementById('manageSkills');

  // Load initial state
  chrome.storage.local.get(['enabled', 'skillsFound'], (result) => {
    toggleExtension.checked = result.enabled || false;
    statusText.textContent = result.enabled ? 'Enabled' : 'Disabled';
    skillsCount.textContent = result.skillsFound || 0;
  });

  // Toggle extension
  toggleExtension.addEventListener('change', () => {
    const enabled = toggleExtension.checked;
    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
    
    chrome.storage.local.set({ enabled });
    
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleHighlighting', enabled });
    });
  });

  // Manage skills button
  manageSkillsBtn.addEventListener('click', () => {
    // TODO: Implement skills management interface
    console.log('Manage skills clicked');
  });
}); 