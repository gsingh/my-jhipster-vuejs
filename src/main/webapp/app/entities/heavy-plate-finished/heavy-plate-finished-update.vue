<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.heavyPlateFinished.home.createOrEditLabel">Create or edit a HeavyPlateFinished</h2>
                <div>
                    <div class="form-group" v-if="heavyPlateFinished.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="heavyPlateFinished.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="heavy-plate-finished-hPFinishedDate">H P Finished Date</label>
                        <div class="input-group">
                            <input id="heavy-plate-finished-hPFinishedDate" type="date" class="form-control" name="hPFinishedDate"  :class="{'valid': !$v.heavyPlateFinished.hPFinishedDate.$invalid, 'invalid': $v.heavyPlateFinished.hPFinishedDate.$invalid }"
                            v-model="$v.heavyPlateFinished.hPFinishedDate.$model"  required />
                        </div>
                        <div v-if="$v.heavyPlateFinished.hPFinishedDate.$anyDirty && $v.heavyPlateFinished.hPFinishedDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.heavyPlateFinished.hPFinishedDate.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="heavy-plate-finished-shift">Shift</label>
                        <select class="form-control" name="shift" :class="{'valid': !$v.heavyPlateFinished.shift.$invalid, 'invalid': $v.heavyPlateFinished.shift.$invalid }" v-model="$v.heavyPlateFinished.shift.$model" id="heavy-plate-finished-shift"  required>
                            <option value="A" >A</option>
                            <option value="B" >B</option>
                            <option value="C" >C</option>
                        </select>
                        <div v-if="$v.heavyPlateFinished.shift.$anyDirty && $v.heavyPlateFinished.shift.$invalid">
                            <small class="form-text text-danger" v-if="!$v.heavyPlateFinished.shift.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="heavy-plate-finished-noOfPlates">No Of Plates</label>
                        <input type="number" class="form-control" name="noOfPlates" id="heavy-plate-finished-noOfPlates"
                            :class="{'valid': !$v.heavyPlateFinished.noOfPlates.$invalid, 'invalid': $v.heavyPlateFinished.noOfPlates.$invalid }" v-model.number="$v.heavyPlateFinished.noOfPlates.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="heavy-plate-finished-hPFinishedTonnage">H P Finished Tonnage</label>
                        <input type="number" class="form-control" name="hPFinishedTonnage" id="heavy-plate-finished-hPFinishedTonnage"
                            :class="{'valid': !$v.heavyPlateFinished.hPFinishedTonnage.$invalid, 'invalid': $v.heavyPlateFinished.hPFinishedTonnage.$invalid }" v-model.number="$v.heavyPlateFinished.hPFinishedTonnage.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="heavy-plate-finished-manager">Manager</label>
                        <select class="form-control" id="heavy-plate-finished-manager" name="manager" v-model="heavyPlateFinished.manager" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="heavyPlateFinished.manager && shiftManagerOption.id === heavyPlateFinished.manager.id ? heavyPlateFinished.manager : shiftManagerOption" v-for="shiftManagerOption in shiftManagers" :key="shiftManagerOption.id">{{shiftManagerOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.heavyPlateFinished.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./heavy-plate-finished-update.component.ts">
</script>
