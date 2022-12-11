import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemData } from "../../../types/inventory-slot";
import { ApplicationState } from "../store";
import { ImportData } from "../../../types/import-data";
import { SlotType } from "../../../types/slot-type";

// Define a type for the slice state
interface PresetState {
  inventorySlots: ItemData[];
  equipmentSlots: ItemData[];
  slotType: SlotType;
  slotIndex: number;
}

interface SetSlot {
  index: number;
  item: ItemData;
}

// Define the initial state using that type
const initialState: PresetState = {
  inventorySlots: new Array(13).fill({ name: "", image: "", label: "" }),
  equipmentSlots: new Array(28).fill({ name: "", image: "", label: "" }),
  slotType: SlotType.Inventory,
  slotIndex: -1,
};

export const presetSlice = createSlice({
  name: "preset",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetSlots: (state: PresetState) => {
      state.inventorySlots = initialState.inventorySlots;
      state.equipmentSlots = initialState.equipmentSlots;
    },
    setInventorySlot: (state: PresetState, action: PayloadAction<SetSlot>) => {
      console.log("[INV] Updating state: ", action.payload);
      state.inventorySlots[action.payload.index] = action.payload.item;
    },
    setEquipmentSlot: (state: PresetState, action: PayloadAction<SetSlot>) => {
      console.log("[EQU] Updating state: ", action.payload);
      state.equipmentSlots[action.payload.index] = action.payload.item;
    },
    importDataAction: (state: PresetState, action: PayloadAction<ImportData>) => {
      state.inventorySlots = action.payload.inventorySlots;
      state.equipmentSlots = action.payload.equipmentSlots;
    },
    updateSlotType: (state: PresetState, action: PayloadAction<SlotType>) => {
      state.slotType = action.payload;
    },
    updateSlotIndex: (state: PresetState, action: PayloadAction<number>) => {
      state.slotIndex = action.payload;
    },
  },
});

export const { resetSlots, setInventorySlot, setEquipmentSlot, importDataAction, updateSlotType, updateSlotIndex } =
  presetSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPreset = (state: ApplicationState) => state.preset;
export const selectInventorySlots = (state: ApplicationState) => state.preset.inventorySlots;

export default presetSlice.reducer;
